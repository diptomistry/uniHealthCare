import React, { useState, useEffect, useRef } from "react";
import { Edit, Save, X } from "lucide-react";
import axios from "axios";

const DynamicTable = ({ AloSchedule, Title }) => {
  const [tableData, setTableData] = useState(AloSchedule);
  const [isEditing, setIsEditing] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const textareaRefs = useRef([]);
  

  useEffect(() => {
    setTableData(AloSchedule);
  }, [AloSchedule]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/auth/get-doctors')
      .then((response) => {
        const doctorsData = response.data.data;
        const formattedDoctors = doctorsData.map((doctor) => {
          const doctorName = doctor.name;
          const departmentName = doctor.department?.name || 'Unknown Department';
          return `${doctorName} (${departmentName})`;
        });
        setDoctors(formattedDoctors);
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
      });
  }, []);

  useEffect(() => {
    textareaRefs.current.forEach((textarea) => {
      if (textarea) {
        autoResize(textarea);
      }
    });
  }, [tableData]);

  const addRow = () => {
    setTableData([...tableData, Array(tableData[0].length).fill([])]);
  };

  const addColumn = () => {
    setTableData(tableData.map((row) => [...row, []]));
  };

  const deleteRow = () => {
    if (tableData.length > 2) {  // Prevent deleting the header row
      setTableData(tableData.slice(0, -1));
    }
  };

  const deleteColumn = () => {
    if (tableData[0].length > 2) {  // Prevent deleting the first column
      setTableData(tableData.map((row) => row.slice(0, -1)));
    }
  };

  const handleCellChange = (rowIndex, colIndex, value) => {
    const newData = tableData.map((row, rIdx) =>
      row.map((cell, cIdx) =>
        rIdx === rowIndex && cIdx === colIndex ? value : cell
      )
    );
    setTableData(newData);
  };

  const autoResize = (textarea) => {
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const MultiSelect = ({ value, onChange, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="relative ">
        <div 
          className="w-full bg-white border border-gray-300 p-2 rounded cursor-pointer flex flex-wrap "
          onClick={() => setIsOpen(!isOpen)}
        >
          {value.length === 0 ? (
            <span className="text-gray-400">Select doctors</span>
          ) : (
            value.map((item, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
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
                className={`p-2 hover:bg-gray-100 cursor-pointer ${value.includes(option) ? 'bg-blue-100' : ''}`}
                onClick={() => {
                  const newValue = value.includes(option)
                    ? value.filter(item => item !== option)
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

  const renderCell = (cell, rowIndex, colIndex) => {
    if (rowIndex === 0 && colIndex === 0) {
      // Top-left cell: always uneditable
      return (
        <div className="w-full bg-gray-100 p-2">{cell}</div>
      );
    } else if (rowIndex === 0) {
      // First row (except first cell): editable text input when in edit mode
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
      // First column (except first cell): always uneditable
      return (
        <div className="w-full bg-gray-100 p-2">{cell}</div>
      );
    } else {
      // All other cells: multi-select when editing, display selected doctors when not
      return isEditing ? (
        <MultiSelect
          value={Array.isArray(cell) ? cell : []}
          onChange={(newValue) => handleCellChange(rowIndex, colIndex, newValue)}
          options={doctors}
        />
      ) : (
        <div className="w-full bg-transparent p-2">
          {Array.isArray(cell) ? cell.join(", ") : cell}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <h1 className="font-hindSiliguri text-textColor text-xl">
          {Title}
        </h1>
   
      </div>
      <div className="flex flex-col md:flex-row gap-5 md:gap-0 mb-4 justify-between">
        <div className="flex gap-2">
          <button
            className="bg-primaryColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out"
            onClick={addRow}
          >
            Add a Row
          </button>
          <button
            onClick={deleteRow}
            className="px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded"
          >
            Delete a Row
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className="bg-primaryColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out"
            onClick={addColumn}
          >
            Add a Column
          </button>
          <button
            onClick={deleteColumn}
            className="px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded"
          >
            Delete a Column
          </button>
        </div>
      </div>
      <div
        className="grid border border-gray-300"
        style={{
          gridTemplateColumns: `repeat(${tableData[0]?.length || 1}, 1fr)`,
        }}
      >
        {tableData.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="p-1 border border-gray-300"
            >
              {renderCell(cell, rowIndex, colIndex)}
            </div>
          ))
        )}
      </div>
      <button
          onClick={toggleEditMode}
          className="flex items-center justify-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out"
        >
          {isEditing ? (
            <>
              <Save size={20} />
              Save
            </>
          ) : (
            <>
              <Edit size={20} />
              Edit
            </>
          )}
        </button>
    </div>
  );
};

export default DynamicTable;

/*
    <div className="flex flex-col gap-5 p-6 md:p-12 bg-white dark:bg-secondary-dark-bg mt-3 mb-3 rounded-2xl shadow-md">

   <button
          onClick={toggleEditMode}
          className="flex items-center justify-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out"
        >
          {isEditing ? (
            <>
              <Save size={20} />
              Save
            </>
          ) : (
            <>
              <Edit size={20} />
              Edit
            </>
          )}
        </button>
*/