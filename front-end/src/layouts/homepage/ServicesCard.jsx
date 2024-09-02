import React from "react";

const ServicesCard = ({ image, title, bodyText }) => {
  return (
   
    <div class="max-w-sm hover:scale-105 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    
        <img class="rounded-t-lg" src={image} alt={title} />
    
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{bodyText}</p>
       
    </div>
</div>

  );
};

export default ServicesCard;
/*
 <div className="group flex flex-col items-center text-center gap-2 w-full p-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
      <div className="bg-secondaryColor p-3 rounded-full transition-colors duration-300 ease-in-out group-hover:bg-primaryColor">
        <img src={image} alt={title} className="w-16 h-16 object-contain rounded-full" />
      </div>
      <h1 className="font-semibold text-lg">{title}</h1>
      <p>{bodyText}</p>
    </div>
*/