import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";

const CharacterComics = ({ characterID }) => {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back--f5rrxgmqcwc8.code.run/comics/${characterID}`
        );
        setComics(response.data.comics);
      } catch (error) {
        console.error("Erreur lors de la récupération des comics", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComics();
  }, [characterID]);

  if (isLoading) return <div>Chargement des comics...</div>;

  if (comics.length === 0)
    return <div>Aucun comic trouvé pour ce personnage.</div>;

  return (
    <div className="mt-10 flex flex-1 flex-nowrap overflow-scroll gap-1">
      {comics.map((comic) => (
        <Card
          key={comic._id}
          isFooterBlurred
          radius="lg"
          className="border-none m-2 min-w-56"
        >
          <Image
            alt={comic.title}
            className="object-cover w-full h-auto"
            height={200}
            src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
            width={200}
          />
          <CardFooter className="justify-between before:bg-white/10 border-white/80 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-tiny text-black">{comic.title}</p>
            <Button
              className="text-tiny text-black bg-black/20"
              onClick={() => navigate(`/comicsdetail/${comic._id}`)}
              variant="flat"
              color="default"
              radius="lg"
              size="sm"
            >
              More infos{" "}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CharacterComics;
