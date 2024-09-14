import React, { useState, useEffect, useRef } from "react";
import { Edit, Save } from "lucide-react";
import Button from "./DutyRoster/Button";


const DynamicTable = ({ AloSchedule, Title }) => {
  const [tableData, setTableData] = useState(AloSchedule);
  const [isEditing, setIsEditing] = useState(false);
  const textareaRefs = useRef([]);

  useEffect(() => {
    setTableData(AloSchedule);
  }, [AloSchedule]);

  useEffect(() => {
    textareaRefs.current.forEach((textarea) => {
      if (textarea) {
        autoResize(textarea);
      }
    });
  }, [tableData]);

  const addRow = () => {
    setTableData([...tableData, Array(tableData[0].length).fill("")]);
  };

  const addColumn = () => {
    setTableData(tableData.map((row) => [...row, ""]));
  };

  const deleteRow = () => {
    if (tableData.length > 1) {
      setTableData(tableData.slice(0, -1));
    }
  };

  const deleteColumn = () => {
    if (tableData[0].length > 1) {
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

  return (
    <div className="flex flex-col gap-5 p-6 md:p-12 bg-white dark:bg-secondary-dark-bg mt-3 mb-3 rounded-2xl shadow-md">
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
              <textarea
                ref={(el) => (textareaRefs.current[rowIndex * tableData[0].length + colIndex] = el)}
                value={cell}
                onChange={(e) => {
                  handleCellChange(rowIndex, colIndex, e.target.value);
                  autoResize(e.target);
                }}
                readOnly={!isEditing}
                className={`w-full bg-transparent p-2 resize-none overflow-hidden focus:outline-none ${
                  isEditing ? 'border border-blue-300' : ''
                }`}
                rows={1}
                onInput={(e) => autoResize(e.target)}
              />
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