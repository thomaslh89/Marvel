import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import CharacterComics from "./CharacterComics";
import { Image, Card, CardBody, Button } from "@nextui-org/react";
const CharactersDetail = () => {
  const { characterID } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://site--marvel-back--f5rrxgmqcwc8.code.run/characterdetail/${characterID}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [characterID]);
  return (
    <div className="">
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <div>
          <div className="flex flex-col items-center">
            <Card
              className="lg:w-[500px] flex flex-col items-center space-y-5 p-4"
              radius="2xl"
            >
              <div className=" rounded-lg overflow-hidden">
                <Image
                  className="w-48 h-48 object-cover"
                  src={`${data.thumbnail.path}/portrait_uncanny.${data.thumbnail.extension}`}
                  alt={data.name}
                />
              </div>
              <div className="space-y-3">
                <div className="text-lg font-bold text-default-800">
                  {data.name}
                </div>
                <div className="text-sm text-default-700">
                  {data.description || "Description not available."}
                </div>
              </div>
            </Card>
          </div>

          <div className="flex flex-col items-start">
            <Card className="mt-10 ">
              <CardBody>
                <p className="ml-1 font-bold text-sm">
                  The Comics in Which I've Acted
                </p>
              </CardBody>
            </Card>
            <div className="overflow-auto  w-full">
              <CharacterComics characterID={characterID} />
            </div>
          </div>
        </div>
      )}
      <Button
        className="mt-2 font-bold hover:text-blue-500"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
    </div>
  );
};

export default CharactersDetail;
