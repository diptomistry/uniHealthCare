import React, { useState, useEffect, useRef } from "react";
import { Edit, Save } from "lucide-react";
import axios from "axios";
import { renderCell } from "../../models/dashboard/RenderCell";
import CustomModal from "../../models/CustomModal";
const DynamicTable = ({ AloSchedule, Title }) => {
  const [tableData, setTableData] = useState(AloSchedule);
  const [isEditing, setIsEditing] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const textareaRefs = useRef([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSlotTime, setNewSlotTime] = useState(""); // New slot time input
  const [assignedDoctors, setAssignedDoctors] = useState({}); 
  const [deletedDoctors, setDeletedDoctors] = useState({});



  useEffect(() => {
    setTableData(AloSchedule);const formatRosterForTable = (rosterData) => {
      const headerRow = ["Day"]; // Start with the 'Day' column
      const rows = [];
    
      // Loop through each day of the week
      rosterData.forEach(day => {
        const dayRow = [day.dayOfWeek]; // First column is the day
    
        // Loop through the slots of the current day
        day.slots.forEach(slot => {
          // Add slot times as headers if they are not already in the headerRow
          if (!headerRow.includes(slot.slotTime)) {
            headerRow.push(slot.slotTime);
          }
    
          // If no doctors are present, include slot time and id
          const doctors = slot.doctors.length > 0 
            ? slot.doctors.map(doctor => {
                return `${doctor.name} (${doctor.specialization}) - Slot ID: ${slot.id} - Doctor ID: ${doctor.id}`;
              }).join(', ')
            : `Slot ID: ${slot.id}, Time: ${slot.slotTime}`;
    
          dayRow.push(doctors); // Push the doctors or slot info if no doctors
        });
    
        rows.push(dayRow);
      });
    
      // Sort headerRow by time, assuming it's in the format '2PM-3PM', '3PM-4PM', etc.
      const sortedHeaderRow = headerRow.slice(1).sort((a, b) => {
        const timeA = parseInt(a.split('PM')[0], 10);
        const timeB = parseInt(b.split('PM')[0], 10);
        return timeA - timeB;
      });
    
      // Combine 'Day' with sorted time slots to form the final header row
      const finalHeaderRow = ['Day', ...sortedHeaderRow];
    
      // Ensure each day's row aligns with the correct time slots
      const alignedRows = rows.map(row => {
        const alignedRow = [row[0]]; // Start with the day of the week
        sortedHeaderRow.forEach(slotTime => {
          const index = headerRow.indexOf(slotTime);
          alignedRow.push(row[index] || `Slot ID: -, Time: ${slotTime}`); // Push empty slot ID and time if no data
        });
        return alignedRow;
      });
    
      return [finalHeaderRow, ...alignedRows];
    };
    
  }, [AloSchedule]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/auth/get-doctors")
      .then((response) => {
        const doctorsData = response.data.data;
        const formattedDoctors = doctorsData.map((doctor) => ({
          doctorId: doctor.userID,
          name: `${doctor.name} (${doctor.department?.name || "Unknown Department"})`,
        }));
        setDoctors(formattedDoctors);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, []);

  useEffect(() => {
    textareaRefs.current.forEach((textarea) => {
      if (textarea) {
        autoResize(textarea);
      }
    });
  }, [tableData]);


  const addColumn = () => {
    //setTableData(tableData.map((row) => [...row, []]));
    setIsModalOpen(true); // Open the modal when adding a slot
  };

 

  const deleteColumn = () => {
    if (tableData[0].length > 2) {
      setTableData(tableData.map((row) => row.slice(0, -1)));
    }
  };


  const handleCellChange = (rowIndex, colIndex, newValue,deleteValue) => {
   console.log("deleteValue",deleteValue);
   if (deleteValue) {
    //deletetValue doctorid:3,slotid:5 .it is a string. now we need to extract doctorid and slotid
    const deleteSlotId = parseInt(deleteValue.match(/slotid:(\d+)/)?.[1], 10);
    
    
   
    const deleteDoctorId = parseInt(deleteValue.match(/doctorid:(\d+)/)?.[1], 10);
    
    
    if (deleteSlotId && deleteDoctorId) {
      setDeletedDoctors((prevState) => ({
        ...prevState,
        [deleteSlotId]: [...(prevState[deleteSlotId] || []), deleteDoctorId],
      }));
    }
  }
    // Update table data with selected doctors locally
    const newData = tableData.map((row, rIdx) =>
      row.map((cell, cIdx) =>
        rIdx === rowIndex && cIdx === colIndex ? newValue : cell
      )
    );
    setTableData(newData);

    // Extract slot ID from newValue
    // Assume newValue is an array of doctor objects
    const slotId = newValue.length > 0 
      ? newValue[0].value.match(/Slot ID:\s(\d+)/)?.[1] 
      : null;

    if (slotId) {
      // Extract doctor IDs from newValue
      const doctorIds = newValue.map((doctor) => doctor.doctorId);

      // Update assigned doctors state
      setAssignedDoctors((prevState) => ({
        ...prevState,
        [slotId]: doctorIds,
      }));
      //console.log("Assigned doctors:", assignedDoctors);
    }
  };


  const autoResize = (textarea) => {
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // const toggleEditMode = () => {
  //   if (isEditing) {
  //     // If currently in edit mode and switching to save, reload the page
  //     window.location.reload();
  //   } 
  //   setIsEditing(!isEditing);
  // };
  const toggleEditMode = async () => {
    if (isEditing) {
      console.log("Assigned doctors:", assignedDoctors);
    
      const token = localStorage.getItem("token");
      
      // Handle doctor assignment
      for (const [slotId, doctorIds] of Object.entries(assignedDoctors)) {
        const filteredDoctorIds = doctorIds.filter(id => id !== null);
  
        if (filteredDoctorIds.length > 0) {
          try {
            console.log(`Assigning doctors to slot ${slotId}:`, filteredDoctorIds);
            await axios.post(
              `http://localhost:8000/api/duty-roster/${slotId}/assign-doctor`,
              { doctorId: filteredDoctorIds },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            console.log(`Assigned doctors to slot ${slotId}:`, filteredDoctorIds);
          } catch (error) {
            console.error(`Error assigning doctors to slot ${slotId}:`, error);
          }
        }
      }
  
      // Handle doctor deletion
      for (const [slotId, doctorIds] of Object.entries(deletedDoctors)) {
        const filteredDoctorIds = doctorIds.filter(id => id !== null);
  
        if (filteredDoctorIds.length > 0) {
          try {
            console.log(`Deleting doctors from slot ${slotId}:`, filteredDoctorIds);
            await axios.post(
              `http://localhost:8000/api/duty-roster/delete-doctor/${slotId}`,
              { doctorId: filteredDoctorIds },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            console.log(`Deleted doctors from slot ${slotId}:`, filteredDoctorIds);
          } catch (error) {
            console.error(`Error deleting doctors from slot ${slotId}:`, error);
          }
        }
      }
  
      // Optionally reload the page after saving
       window.location.reload();
    }
    setIsEditing(!isEditing); // Toggle between edit and view mode
  };
  
  
  
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddSlot = () => {
    const token = localStorage.getItem("token"); // Retrieve token from local storage
  
    if (!newSlotTime) {
      alert("Please enter a valid slot time.");
      return;
    }
  
    axios
      .post(
        "http://localhost:8000/api/duty-roster/create",
        { slotTime: newSlotTime.toUpperCase() },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include bearer token
          },
        }
      )
      .then((response) => {
        const newSlot = response.data;
        console.log("Slot added:", newSlot);
  
       
        window.location.reload();
  
        setNewSlotTime(""); // Reset the input
        setIsModalOpen(false); // Close the modal
      })
      .catch((error) => {
        console.error("Error adding slot:", error);
      });
  };
  


  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <h1 className="font-hindSiliguri text-textColor text-xl">{Title}</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-5 md:gap-0 mb-4 justify-between">
        
        
          <button
            className="bg-primaryColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out"
            onClick={addColumn}
          >
            Create a Slot
          </button>
          <button
            onClick={deleteColumn}
            className="px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded"
          >
            Delete a Slot
          </button>
        
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
              {renderCell(cell, rowIndex, colIndex, isEditing, handleCellChange, doctors)}
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
            Edit Mode
          </>
        )}
      </button>
      <CustomModal isOpen={isModalOpen} onRequestClose={handleModalClose}>
        <h2 className="text-lg font-bold mb-4">Create a New Slot</h2>
        <input
          type="text"
         
          value={newSlotTime}
          onChange={(e) => setNewSlotTime(e.target.value)}
          placeholder="Enter slot time (e.g., 4PM-5PM)"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handleModalClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleAddSlot}
            className="px-4 py-2 bg-primaryColor text-white rounded-md"
          >
            Add Slot
          </button>
        </div>
      </CustomModal>
    </div>
  );
};

export default DynamicTable;

