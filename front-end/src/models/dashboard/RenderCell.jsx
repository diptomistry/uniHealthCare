import React from "react";
import MultiSelect from "./MultiSelect";

export const renderCell = (
  cell,
  rowIndex,
  colIndex,
  isEditing,
  handleCellChange,
  doctors,
  
) => {
 
  
  if (rowIndex === 0 && colIndex === 0) {
    return <div className="w-full bg-gray-100 p-2">{cell}</div>;
  } else if (rowIndex === 0) {
    return isEditing ? (
      <input
        type="text"
        value={cell}
        onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
        className="w-full bg-transparent p-2 border border-blue-300 rounded"
      />
    ) : (
      <div className="w-full bg-gray-100 p-2">{cell}</div>
    );
  } else if (colIndex === 0) {
    return <div className="w-full bg-gray-100 p-2">{cell}</div>;
  } else {
    // If cell contains "No doctors", convert to an empty array
    const cellValue = cell === "No doctors" ? [] : Array.isArray(cell) ? cell : [cell];

    // Remove duplicate doctors (if applicable)
    const uniqueCellValue = [...new Set(cellValue)];
    

    // Prepare the value as an array of objects like { id: 13, value: "Dr. John Doe (Cardiology)", doctorId: 3 }
    const formattedCellValue = uniqueCellValue.map(item => {
      if (typeof item === 'string') {
        const slotIdMatch = item.match(/Slot ID:\s(\d+)/); // Extract slot ID
        const doctorIdMatch = item.match(/Doctor ID:\s(\d+)/); // Extract doctor ID if available
        const slotId = slotIdMatch ? parseInt(slotIdMatch[1], 10) : null;
        const doctorId = doctorIdMatch ? parseInt(doctorIdMatch[1], 10) : null;
        //const doctorName = item.replace(/\s-\sSlot ID:\s\d+/g, "").replace(/\s-\sDoctor ID:\s\d+/g, ""); // Remove "Slot ID: X" and "ID: X"
        const doctorName = item.replace(/\s-\sSlot ID:\s\d+/g, ""); // Remove "Slot ID: X" 

        return { id: slotId, value: item, doctorId }; // Include doctorId in the object
      } else if (typeof item === 'object' && item !== null) {
        // If item is already an object, return it as is
        return item;
      } else {
        // For any other type, return a default object
        return { id: null, value: String(item), doctorId: null };
      }
    });


    return isEditing ? (
      <MultiSelect
        value={formattedCellValue} // Pass the array of objects to MultiSelect
        uniqueCellValue={cell}
        onChange={(newValue,deleteValue) => handleCellChange(rowIndex, colIndex, newValue,deleteValue)}
        options={doctors}
      />
    ) : (
      <div className="w-full bg-transparent p-2">
        {/* Display only the doctor names, not the slot IDs or doctor IDs */}
        {formattedCellValue.map((doctor) => doctor.value.replace(/\s-\sDoctor ID:\s\d+/g, "").replace(/\s-\sSlot ID:\s\d+/g, "")).join(", ")}
      </div>
    );
  }
};
