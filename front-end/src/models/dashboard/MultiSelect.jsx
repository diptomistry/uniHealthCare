import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

const MultiSelect = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedDoctors = Array.isArray(value) ? value : [];

  const deleteDoctor = async (slotId, doctorId) => {
    try {
      await axios.post(
        `http://localhost:8000/api/duty-roster/delete-doctor/${slotId}`,
        { doctorId: [doctorId] },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      onChange(selectedDoctors.filter(doc => doc.id !== doctorId));
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  return (
    <div className="relative">
      <div
        className="w-full bg-white border border-gray-300 p-2 rounded cursor-pointer flex flex-wrap"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedDoctors.length === 0 ? (
          <span className="text-gray-400">Select doctors</span>
        ) : (
          selectedDoctors.map((item, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
            >
              {item.value}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteDoctor(item.id, item.id);
                }}
                className="ml-1 text-blue-800 hover:bg-blue-200 rounded-full"
              >
                <X size={12} />
              </button>
            </span>
          ))
        )}
      </div>
      
      {isOpen && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.doctorId}
              className={`p-2 hover:bg-gray-100 cursor-pointer ${
                selectedDoctors.some((doc) => doc.id === option.doctorId)
                  ? "bg-blue-100"
                  : ""
              }`}
              onClick={() => {
                const newValue = selectedDoctors.some((doc) => doc.id === option.doctorId)
                  ? selectedDoctors.filter((doc) => doc.id !== option.doctorId)
                  : [...selectedDoctors, { id: option.doctorId, value: option.name }];
                onChange(newValue);
              }}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;