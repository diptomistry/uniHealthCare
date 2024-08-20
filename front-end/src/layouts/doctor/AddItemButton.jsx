import React from "react";

const AddItemButton = ({title}) => {
  return (
    <div>
      {" "}
      <button
        class="rounded-lg relative w-64 sm:w-80 h-10 cursor-pointer flex items-center border border-primaryColor bg-secondaryColor group hover:bg-primaryColor active:bg-primaryColor active:border-green-500"
       
      >
        <span class="text-gray-200 md:text-md text-sm font-semibold ml-8 transform group-hover:translate-x-20 transition-all duration-300">
          {title}
        </span>
        <span class="absolute right-0 h-full w-10 rounded-lg bg-primaryColor flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
          <svg
            class="svg w-8 text-white"
            fill="none"
            height="24"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="12" x2="12" y1="5" y2="19"></line>
            <line x1="5" x2="19" y1="12" y2="12"></line>
          </svg>
        </span>
      </button>
    </div>
  );
};

export default AddItemButton;
