import React from "react";
import MultiSelect from "./MultiSelect";
export const renderCell = (
    cell,
    rowIndex,
    colIndex,
    isEditing,
    handleCellChange,
    doctors
  ) => {
    //console.log(`Rendering cell at [${rowIndex}, ${colIndex}] with value:`, cell);
  
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
  
      return isEditing ? (
        <MultiSelect
          value={uniqueCellValue}
          onChange={(newValue) => handleCellChange(rowIndex, colIndex, newValue)}
          options={doctors}
        />
      ) : (
        <div className="w-full bg-transparent p-2">
          {uniqueCellValue.join(", ")}
        </div>
      );
    }
  };
  