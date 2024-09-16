import React, { useState } from "react";
import { Contact, X } from "lucide-react";
import axios from "axios";

const MultiSelect = ({ value, onChange, options,uniqueCellValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log('uniqueCellValue',uniqueCellValue);
  console.log('value',value);
  const selectedDoctors = Array.isArray(value) ? value : [];
  
  const assignDoctor = async (slotId, doctorId) => {
    console.log('slotId',slotId);
    console.log('doctorId',doctorId);
    try {
      await axios.post(
        `http://localhost:8000/api/duty-roster/${slotId}/assign-doctor`,
        { doctorId: [doctorId] },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
    } catch (error) {
      console.error("Error assigning doctor:", error);
    }
  };
  const deleteDoctor = async (slotId, doctorId) => {
    console.log('slotId',slotId);
    console.log('doctorId',doctorId);
    try {
      // Send request to the API to delete the specific doctor
      await axios.post(
        `http://localhost:8000/api/duty-roster/delete-doctor/${slotId}`,
        { doctorId: [doctorId] },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      // Update the frontend state to remove only the doctor being clicked
      const updatedDoctors = selectedDoctors.map((item) => {
        // Use regex to find all doctors in the cell
        const doctorMatches = item.value.matchAll(/(.+?)\s+-\s+Doctor ID:\s+(\d+)/g);
        const doctors = Array.from(doctorMatches);

        // Filter out the doctor with the matching doctorId
        const filteredDoctors = doctors.filter(
          (doctor) => parseInt(doctor[2], 10) !== doctorId
        );

        // Reconstruct the value without the deleted doctor
        const newValue = filteredDoctors
          .map((doctor) => `${doctor[1].trim()} - Doctor ID: ${doctor[2]}`)
          .join(", ");

        return { ...item, value: newValue };
      });

      // Filter out empty entries (cells that have no doctors left)
      onChange(updatedDoctors.filter((item) => item.value.trim() !== ""));

    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  const handleSelectDoctor = (option) => {
    const doctorId = option.doctorId;
    assignDoctor(selectedDoctors[0].id, doctorId); 
  
    const newValue = selectedDoctors.some(
      (doc) => doc.doctorId === option.doctorId
    )
      ? selectedDoctors.filter((doc) => doc.doctorId !== option.doctorId) // Unselect if already selected
      : [...selectedDoctors, { doctorId: option.doctorId, value: `${option.name} - Doctor ID: ${option.doctorId}` }]; // Add new doctor with proper format

    onChange(newValue);
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
          selectedDoctors.map((item, index) => {
            const doctorMatches = item.value.matchAll(
              /(.+?)\s+-\s+Doctor ID:\s+(\d+)/g
            );
            const doctors = Array.from(doctorMatches);

            return (
              <React.Fragment key={index}>
                {doctors.map((doctor, partIndex) => {
                  const doctorName = doctor[1].trim(); // Doctor name
                  const doctorId = parseInt(doctor[2], 10); // Extracted doctorId

                  return (
                    <span
                      key={`${index}-${partIndex}`}
                      className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded flex items-center"
                    >
                      {doctorName}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteDoctor(item.id, doctorId); // Correct doctorId is passed
                        }}
                        className="ml-1 text-blue-800 hover:bg-blue-200 rounded-full"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  );
                })}
              </React.Fragment>
            );
          })
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.doctorId}
              className={`p-2 hover:bg-gray-100 cursor-pointer ${
                selectedDoctors.some((doc) => doc.doctorId === option.doctorId)
                  ? "bg-blue-100"
                  : ""
              }`}
              onClick={() => handleSelectDoctor(option)} // Add the doctor to the selection
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
