import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ComicsCard from "./ComicsCard";
import {
  Pagination,
  CircularProgress,
  ButtonGroup,
  Button,
  Input,
} from "@nextui-org/react";

const Comics = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [skipValue, setSkipValue] = useState(1);
  const [title, setTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const limit = 9;

  const totalPages = Math.ceil(data.count / limit);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `https://site--marvel-back--f5rrxgmqcwc8.code.run/comics?title=${title}&skip=${skipValue}&limit=${limit}`
        );
        console.log("comics data=>>>", response.data);
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
    setSearchQuery(title);
  };
  const handleReset = () => {
    setSearchQuery("");
    setTitle("");
  };

  return (
    <div>
      {isLoading ? (
        <CircularProgress aria-label="Loading..." className="justify-center" />
      ) : (
        <>
          <div className="flex flex-col items-center mt-1 gap-2 lg:flex-row lg:gap-10 lg:justify-center">
            <Button className="hover:text-blue-500" onClick={handleSearch}>
              Rechercher
            </Button>
            <div className="flex flex-col items-center gap-2 md:flex-nowrap md:gap-4">
              <Input
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                type="text"
                placeholder="Tapez votre rechercher ici"
                name="searchBar"
                id="searchBar"
                onChange={(event) => setTitle(event.target.value)}
              />

              <Button className="hover:text-blue-500" onClick={handleReset}>
                All comics{" "}
              </Button>
            </div>
            <Pagination
              page={skipValue}
              total={totalPages}
              onChange={(page) => setSkipValue(page)}
              ellipsis={1}
            />
          </div>
          <div className="flex flex-1 flex-nowrap overflow-scroll gap-1 mt-5  lg:flex-wrap lg:justify-center lg:overflow-hidden">
            {data.results && data.results.length > 0 ? (
              data.results.map((val, index) => {
                return <ComicsCard key={index} data={val} />;
              })
            ) : (
              <div className="noresults-comics">No character found.</div>
            )}
          </div>
          <div></div>
        </>
      )}
    </div>
  );
};
export default Comics;
