import React, { useState } from 'react';
import Button from '../homepage/Button';


const DynamicTable = ({ AloSchedule,Title }) => {
  const [tableData, setTableData] = useState(AloSchedule);

  // Function to add a new row
  const addRow = () => {
    setTableData([...tableData, Array(tableData[0].length).fill('')]);
  };

  // Function to add a new column
  const addColumn = () => {
    setTableData(tableData.map(row => [...row, '']));
  };

  // Function to delete the last row
  const deleteRow = () => {
    if (tableData.length > 1) {
      setTableData(tableData.slice(0, -1));
    }
  };

  // Function to delete the last column
  const deleteColumn = () => {
    if (tableData[0].length > 1) {
      setTableData(tableData.map(row => row.slice(0, -1)));
    }
  };

  // Function to handle cell changes
  const handleCellChange = (rowIndex, colIndex, value) => {
    const newData = tableData.map((row, rIdx) => 
      row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? value : cell))
    );
    setTableData(newData);
  };

  return (
    <div className='flex flex-col gap-5'>
      <h1 className='flex justify-center font-hindSiliguri text-textColor text-xl'>{Title}</h1>
      <div className='flex flex-col md:flex-row gap-5 md:gap-0  mb-4 justify-between'>
      
       <div className='flex gap-2'>
       <button onClick={addRow} ><Button title={'Add a Row'}/></button>
       <button onClick={deleteRow} className='px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded'>Delete a Row</button>
       </div>
      <div className='flex gap-2'>
      <button onClick={addColumn} ><Button title={'Add a Column'}/></button>
      <button onClick={deleteColumn} className='px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded'>Delete a Column</button>
      </div>
      </div>
      <div className="grid border border-gray-300" style={{ gridTemplateColumns: `repeat(${tableData[0].length}, 1fr)` }}>
        {tableData.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <div 
              key={`${rowIndex}-${colIndex}`} 
              className="p-1 border border-gray-300 overflow-auto"
            >
              <textarea
                type="text"
                value={cell}
                onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                className="w-full bg-transparent"
              />
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default DynamicTable;
