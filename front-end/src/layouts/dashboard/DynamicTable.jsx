import React, { useState, useEffect, useRef } from "react";
import { Edit, Save } from "lucide-react";
import axios from "axios";
import { renderCell } from "../../models/dashboard/RenderCell";
import CustomModal from "../../models/CustomModal";
import DeleteConfirmationModal from "../../models/DeleteConfirmationModal";
const DynamicTable = ({ AloSchedule, Title }) => {
  const [tableData, setTableData] = useState(AloSchedule);
  const [isEditing, setIsEditing] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const textareaRefs = useRef([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSlotTime, setNewSlotTime] = useState(""); // New slot time input
  const [assignedDoctors, setAssignedDoctors] = useState({}); 
  const [deletedDoctors, setDeletedDoctors] = useState({});
  const [isDltModalOpen, setIsDltModalOpen] = useState(false);
  const [dltSlot, setDltSlot] = useState("");
  const [currentSlot, setCurrentSlot] = useState("");
  const [updateSlot, setUpdateSlot] = useState("");
  const [isEditModalOpen, setIEditModalOpen] = useState(false);
  
const handleUpdateSlot = () => {
  const token = localStorage.getItem("token");
  const updateSlotFinal = updateSlot.toUpperCase();
  axios.put(`http://localhost:8000/api/duty-roster/update/${currentSlot}`, {
    newSlotTime: updateSlotFinal,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    setUpdateSlot("");
    setCurrentSlot("");
    setIEditModalOpen(false);
   
    window.location.reload();
  })
  .catch((error) => {
    console.error("Error updating slot:", error.response ? error.response.data : error);
  });
};


const handleDeleteSlot = (slot) => { 
  setIsDltModalOpen(true);
  setDltSlot(slot);

}
const handleEditSlot = (slot) => {
  setIEditModalOpen(true);
  setCurrentSlot(slot);
  setUpdateSlot(slot);
}
const handleConfirmDelete = () => {
  //DELETE with bearer token:http://localhost:8000/api/duty-roster/delete/4PM-5PM
  const token = localStorage.getItem("token");
  axios
    .delete(`http://localhost:8000/api/duty-roster/delete/${dltSlot}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setDltSlot("");
      //alert("Slot deleted successfully");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error deleting slot:", error);
    });
  
};
const handleCloseDeleteModal = () => {
  setIsDltModalOpen(false);
};


  useEffect(() => {
    setTableData(AloSchedule);
    //formatRosterForTable here//
   
    
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

 

 
  
  

  const handleCellChange = (rowIndex, colIndex, newValue,deleteValue) => {
  
   console.log("newValue",newValue);
   
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

 
  const toggleEditMode = async () => {
    if (isEditing) {
  
    //example console output: ['changed:6PM-7PM current:6PM-pm', 'changed:3PM-4P current:3PM-4PM']
    
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
    
      <div className="flex flex-col md:flex-row gap-5 md:gap-0 mb-4 justify-between">
      <h1 className="font-hindSiliguri text-textColor text-xl">{Title}</h1>
        
          <button
            className="bg-primaryColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out"
            onClick={addColumn}
          >
            Create a Slot
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
              {renderCell(cell, rowIndex, colIndex, isEditing, handleCellChange, doctors,handleDeleteSlot,handleEditSlot)}
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
      <CustomModal isOpen={isEditModalOpen} onRequestClose={() => setIEditModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4">Edit Slot</h2>
        <input
          type="text"
          value={updateSlot}
          onChange={(e) => setUpdateSlot(e.target.value)}
          placeholder="Enter slot time (e.g., 4PM-5PM)"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => setIEditModalOpen(false)}
            className="px-4 py-2 bg-gray-400 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateSlot}
            className="px-4 py-2 bg-primaryColor text-white rounded-md"
          >
            Update Slot
          </button>
        </div>
      </CustomModal>
      <DeleteConfirmationModal
        isOpen={isDltModalOpen}
        onRequestClose={handleCloseDeleteModal}
        itemName={dltSlot}
        onConfirmDelete={handleConfirmDelete}
        title='the slot'
      />
    </div>
  );
};

export default DynamicTable;

