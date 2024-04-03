import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import CharactersCard from "../pages/CharacterPages/CharactersCard";
import {
  Pagination,
  CircularProgress,
  ButtonGroup,
  Button,
  Input,
} from "@nextui-org/react";

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [skipValue, setSkipValue] = useState(1);
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); // Ce qui sera utilisé pour la requête
  const limit = 9;

  const totalPages = Math.ceil(data.count / limit);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `https://site--marvel-back--f5rrxgmqcwc8.code.run/characters?name=${name}&skip=${skipValue}&limit=${limit}`
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchQuery, skipValue]);
  const handleSearch = () => {
    setSearchQuery(name);
  };
  const handleReset = () => {
    setSearchQuery("");
    setName("");
  };

  return (
    <div>
      {isLoading ? (
        <CircularProgress aria-label="Loading..." className="justify-center" />
      ) : (
        <>
          <div className="flex flex-col items-center mt-1 gap-2 lg:flex-row lg:gap-2 lg:justify-center">
            <Button
              className="hover:text-blue-500"
              onClick={handleReset} // Changé `onPress` par `onClick`
            >
              All characters
            </Button>

            <div className="flex flex-col items-center gap-2 md:flex-nowrap md:gap-4 lg:flex lg:flex-row lg:gap-2">
              <Input
                type="text"
                placeholder="Search"
                name="searchBar"
                id="searchBar"
                onChange={(event) => setName(event.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
              <Button
                className="hover:text-blue-500"
                onClick={handleSearch} // Changé `onPress` par `onClick`
              >
                Search
              </Button>
            </div>

            <Pagination
              size="sm"
              page={skipValue}
              total={totalPages}
              onChange={(page) => setSkipValue(page)}
              ellipsis={1}
            />
          </div>

          <div className="flex flex-1 flex-nowrap overflow-scroll gap-1 mt-5  lg:flex-wrap lg:justify-center lg:overflow-hidden">
            {data.results && data.results.length > 0 ? (
              data.results.map((val, index) => (
                <CharactersCard key={index} data={val} />
              ))
            ) : (
              <div>No character found.</div>
            )}
          </div>

          <div></div>
        </>
      )}
    </div>
  );
};
export default Home;
