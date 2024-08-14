import React from "react";

const GeneralButton = ({
  label,
  onClick,
  iconDirection = "right", // Default icon direction is 'right'
  bgColor = "bg-white",
  hoverColor = "hover:bg-secondaryColor",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${bgColor} ${hoverColor} text-center w-48 rounded-2xl h-14 relative font-sans text-black text-xl font-semibold group`}
    >
      <div
        className={`${
          iconDirection === "right" ? "right-1" : "left-1"
        } bg-secondaryColor rounded-xl h-12 w-1/4 flex items-center justify-center absolute top-[4px] group-hover:w-[184px] z-10 duration-500`}
      >
        <svg
          width="25px"
          height="25px"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          {iconDirection === "right" ? (
            <>
              <path
                fill="#000000"
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
              ></path>
              <path
                fill="#000000"
                d="M786.752 512 521.344 246.656a32 32 0 0 1 45.312-45.312l288 288a32 32 0 0 1 0 45.312l-288 288a32 32 0 0 1-45.312-45.312L786.752 512z"
              ></path>
            </>
          ) : (
            <>
              <path
                fill="#000000"
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
              ></path>
              <path
                fill="#000000"
                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
              ></path>
            </>
          )}
        </svg>
      </div>
      <p className={`${iconDirection === "right" ? "translate-x-[-8px]" : "translate-x-2"}`}>
        {label}
      </p>
    </button>
  );
};

export default GeneralButton;
