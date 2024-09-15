import React, { useState } from "react";
import { X } from "lucide-react";

const MultiSelect = ({ value, onChange, options }) => {
    console.log('value',value);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className="w-full bg-white border border-gray-300 p-2 rounded cursor-pointer flex flex-wrap"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value.length === 0 ? (
          <span className="text-gray-400">Select doctors</span>
        ) : (
          value.map((item, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
            >
              {item}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(value.filter((_, i) => i !== index));
                }}
                className="ml-1 text-blue-800 hover:text-blue-900"
              >
                <X size={12} />
              </button>
            </span>
          ))
        )}
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded max-h-60 overflow-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className={`p-2 hover:bg-gray-100 cursor-pointer ${
                value.includes(option) ? "bg-blue-100" : ""
              }`}
              onClick={() => {
                const newValue = value.includes(option)
                  ? value.filter((item) => item !== option)
                  : [...value, option];
                onChange(newValue);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
