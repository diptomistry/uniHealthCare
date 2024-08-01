import React from "react";

const ServicesCard = ({ icon, title, bodyText }) => {
  return (
    <div className="group flex flex-col items-center text-center gap-2 w-full  p-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
      <div className="bg-secondaryColor p-3 rounded-full transition-colors duration-300 ease-in-out group-hover:bg-primaryColor">
        {icon}
      </div>
      <h1 className="font-semibold text-lg">{title}</h1>
      <p>{bodyText}</p>
    </div>
  );
};

export default ServicesCard;
