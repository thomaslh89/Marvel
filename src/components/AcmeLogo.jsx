import React from "react";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
export const AcmeLogo = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/`);
  };
  return (
    <div onClick={handleClick} className="cursor-pointer">
      <img
        className="w-12 h-12 fill-none ml-7 lg:w-20 lg:h-20"
        src={Logo}
        alt="logo-marvel"
      />
    </div>
  );
};
