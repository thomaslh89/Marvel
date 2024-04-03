import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Image, Card, CardBody, Button } from "@nextui-org/react";

const ComicsDetails = () => {
  const { comicID } = useParams();
  const navigate = useNavigate(); // Utilise useNavigate au lieu de useHistory
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (comicID) {
          const response = await axios.get(
            `https://site--marvel-back--f5rrxgmqcwc8.code.run/comicsdetail/${comicID}`
          );
          setData(response.data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [comicID]);

  return (
    <div className="maincomicsDescription">
      {isLoading ? (
        <span>en cours de chargement...</span>
      ) : (
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
                {data.title}
              </div>
              <div className="text-sm text-default-700">
                {data.description || "Description not available."}
              </div>
            </div>
          </Card>
          <Button
            className="mt-2 font-bold hover:text-blue-500"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>
      )}
    </div>
  );
};

export default ComicsDetails;
