import React from "react";

const PrimaryButton = ({ title, bgColor }) => {
  return (
    <div>
      <button
        className={`text-white px-4 py-2 rounded-md transition duration-300 ease-in-out ${bgColor}`}
      >
        {title}
      </button>
    </div>
  );
};

export default PrimaryButton;
