import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";

const ServicesCard = ({ image, title, bodyText, onEdit, onDelete }) => {
  return (
    <div class="max-w-sm hover:scale-105 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    
    <img class="rounded-t-lg" src={image} alt={title} />

<div class="p-5">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{bodyText}</p>
   
</div>
      <div className="relative bottom-2 -right-80 flex gap-2">
        <FaRegEdit onClick={onEdit} className="text-blue-500 cursor-pointer" />
        <MdOutlineDeleteOutline onClick={onDelete} className="text-red-500 cursor-pointer" />
      </div>
    </div>
  );
};

export default ServicesCard;
