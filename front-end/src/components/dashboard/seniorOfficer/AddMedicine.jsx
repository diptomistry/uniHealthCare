
import React, { useState,useEffect } from "react";
import List from "../doctor/List";
import CustomModal from "../../../models/CustomModal";
import { medicineGrid } from "../../../assets/dashboard";
import Button from "../../../layouts/dashboard/DutyRoster/Button";

const unavailableMedicines = [
  { id: 1, medicineName: "Medicine A" },
  { id: 2, medicineName: "Medicine B" },
];

const AddMedicine = () => {
  const toolbarOptions = [
    "Search",
    "PdfExport",
    "ExcelExport",
    "CsvExport",
    "Delete",
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [requestedQuantity, setRequestedQuantity] = useState("");
  const [isAddingNewMedicine, setIsAddingNewMedicine] = useState(false);
  const [newMedicineName, setNewMedicineName] = useState("");
  const [price, setPrice] = useState("");
  const [medicineData, setMedicineData] = useState([]);
  const [expiryDate, setExpiryDate] = useState(""); // Add expiryDate state

   // Fetch medicines from API
   useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/medicines/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
  
        // Process data to add status and batchNo
        const processedData = data.map((medicine) => {
          const stockQuantity = medicine.stockQuantity || 0;
          const expiryDate = new Date(medicine.expiryDate);
          const today = new Date();
  
          // Format expiry date to 'YYYY-MM-DD'
          const formattedExpiryDate = expiryDate.toISOString().split('T')[0];
  
          let status = "";
          let statusBg = "";
  
          if (expiryDate < today) {
            status = "Expired";
            statusBg = "red";
          } else if (stockQuantity === 0) {
            status = "Out of Stock";
            statusBg = "#E35335";
          } else if (stockQuantity <= 10) {
            status = "Low Stock";
            statusBg = "#FB9678";
          } else {
            status = "Available";
            statusBg = "#8BE78B";
          }
  
          return {
            medicineName: medicine.name,
            batchNo: "B12345", // Set a constant for batchNo for now
            expiryDate: formattedExpiryDate, // Show formatted date
            quantity: stockQuantity,
            Status: status,
            StatusBg: statusBg,
          };
        });
  
        setMedicineData(processedData);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };
  
    fetchMedicines();
  }, []);
  

  const handleButtonClick = (medicine) => {
    setSelectedMedicine(medicine);
    setNewMedicineName(medicine.medicineName);
    setIsModalOpen(true);
    setIsAddingNewMedicine(false);
  };

  const handleAddMoreMedicineClick = () => {
    setSelectedMedicine(null); // Clear any selected medicine
    setIsAddingNewMedicine(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRequestedQuantity(""); // Reset the quantity field when closing the modal
    setNewMedicineName(""); // Reset the new medicine name field
  };

  const handleRequestSubmit = async () => {
    const expiryDateTimestamp = new Date(expiryDate).getTime(); // Convert expiry date to timestamp
  
    const newMedicine = {
      name: newMedicineName,
      entryDate: Date.now(), // Current timestamp for entry date
      expiryDate: expiryDateTimestamp,
      description: "Pain reliever", // You can change or pass this as a prop
      price: price, // Set price here
      isOutside: false, // Adjust based on your data
      stockQuantity: parseInt(requestedQuantity, 10),
      addedBy: 21, // Replace with actual user ID or variable
    };
  
    try {
      const response = await fetch("http://localhost:8000/api/medicines/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newMedicine),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("New medicine added:", data);
        closeModal(); // Close modal after successful submission
      } else {
        console.error("Failed to add medicine");
      }
    } catch (error) {
      console.error("Error adding medicine:", error);
    }
  };
  

  return (
    <div className="bg-white dark:bg-secondary-dark-bg rounded-2xl shadow-md p-10 mb-10">
          <div className="flex justify-end ">
        <button onClick={handleAddMoreMedicineClick} className="mb-4 ">
            <Button title={"ADD New Medicine"} />
          </button>
        </div>
      <List
        title="List of Medicines"
        patientsData={medicineData}
        patientsGrid={medicineGrid}
        toolbarOptions={toolbarOptions}
        onButtonClick={handleButtonClick}
        status={"Add"}
        
      />

      <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Doctors Manual Entry Medicines</h2>
        
          
          
        
        <ul>
          {unavailableMedicines.map((medicine) => (
            <li
              key={medicine.id}
              className="flex justify-between items-center mb-4 p-4 border-b border-gray-300"
            >
              <div>
                <p className="font-semibold text-gray-700">{medicine.medicineName}</p>
              </div>
              <button
                className="text-white py-1 px-4 md:mr-10 mr-0 rounded bg-primaryColor hover:bg-hoverColor transition duration-300"
                onClick={() => handleButtonClick(medicine)}
              >
                ADD
              </button>
            </li>
          ))}
        </ul>
      
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        ChildrenStyle="overflow-y-auto"
      >
        <div className="p-4 ">
          <h2 className="text-xl font-bold mb-4">
            {isAddingNewMedicine ? "Add New Medicine" : "Add Medicine"}
          </h2>

          {isAddingNewMedicine ? (
  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-500 mb-2">
        Medicine Name
      </label>
      <input
        type="text"
        className="shadow-sm p-4 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md"
        value={newMedicineName}
        onChange={(e) => setNewMedicineName(e.target.value)}
        placeholder="Enter name"
      />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-500 mb-2">
        Batch No
      </label>
      <input
        type="text"
        className="shadow-sm p-4 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md"
        placeholder="Enter batch number"
      />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-500 mb-2">
        Description
      </label>
      <input
        type="text"
        className="shadow-sm p-4 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md"
        placeholder="Enter description"
      />
    </div>
  </div>
) : (
  selectedMedicine && (
    <div>
     
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
   <div>   <p className="mb-4">
        Medicine Name:{" "}
       
      </p>
      <p className="font-semibold text-brightColor">
          {selectedMedicine.medicineName}
        </p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-500 mb-2">
            Batch No
          </label>
          <input
            type="text"
            className="shadow-sm p-4 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md"
            placeholder="Enter batch number"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-500 mb-2">
            Description
          </label>
          <input
            type="text"
            className="shadow-sm p-4 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md"
            placeholder="Enter description"
          />
        </div>
      </div>
    </div>
  )
)}

<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-500 mb-2">
      Quantity
    </label>
    <input
      type="number"
      className="shadow-sm p-4 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md"
      value={requestedQuantity}
      onChange={(e) => setRequestedQuantity(e.target.value)}
      placeholder="Enter quantity"
    />
  </div>
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-500 mb-2">
      Expiry Date
    </label>
    <input
      type="date"
      value={expiryDate}
      className="shadow-sm p-4 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md"
      onChange={(e) => setExpiryDate(e.target.value)} 
      placeholder="Enter expiry date"
    />
  </div>
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-500 mb-2">
      Price
    </label>
    <input
      type="text"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      className="shadow-sm p-4 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md"
      placeholder="Enter price"
    />
  </div>
</div>


          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleRequestSubmit}
              className="px-4 py-2 bg-primaryColor text-white rounded hover:bg-hoverColor transition duration-300"
            >
              Submit 
            </button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default AddMedicine;
