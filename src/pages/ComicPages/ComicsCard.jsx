import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

const ComicsCard = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/comicsdetail/${data._id}`);
  };

  return (
    <Card
      className="min-w-28 m-2 py-4 flex flex-col items-center justify-center"
      isPressable
      onPress={handleClick}
    >
      <CardHeader className="pb-0 pt-2 px-4 text-center">
        <p className="text-tiny uppercase font-bold text-center">
          {data.title}
        </p>
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex items-center justify-center">
        <Image
          isBlurred
          isZoomed
          alt={data.title}
          className="h-14 w-14 lg:h-80 lg:w-56 object-cover rounded-xl"
          src={`${data.thumbnail.path}/portrait_uncanny.${data.thumbnail.extension}`}
          // style={{ width: "270px", height: "400px" }} // Ajuste en fonction de la taille souhaitée
        />
      </CardBody>
    </Card>
  );
};

export default ComicsCard;
