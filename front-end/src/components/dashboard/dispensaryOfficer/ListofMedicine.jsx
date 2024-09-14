import React, { useState,useEffect } from "react";
import List from "../doctor/List";
import CustomModal from "../../../models/CustomModal";
import { medicineData, medicineGrid } from "../../../assets/dashboard";
import Button from "../../../layouts/dashboard/DutyRoster/Button";

const unavailableMedicines = [
  { id: 1, medicineName: "Medicine A" },
  { id: 2, medicineName: "Medicine B" },
];

const ListofMedicine = () => {
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
  const [medicineData, setMedicineData] = useState([]);
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

  const handleRequestSubmit = () => {
    if (isAddingNewMedicine) {
      console.log(`Adding new medicine: ${newMedicineName} with quantity: ${requestedQuantity}`);
      // Logic to handle adding a new medicine
    } else {
      console.log(`Requested ${requestedQuantity} of ${selectedMedicine?.medicineName}`);
      // Logic to handle requesting an existing medicine
    }
    closeModal();
  };

  return (
    <div className="bg-white dark:bg-secondary-dark-bg rounded-2xl shadow-md p-10 mb-10">
      <List
        title="List of Medicines"
        patientsData={medicineData}
        patientsGrid={medicineGrid}
        toolbarOptions={toolbarOptions}
        onButtonClick={handleButtonClick}
        status={"Request"}
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
                Request
              </button>
            </li>
          ))}
        </ul>
        <div className="flex justify-end mr-10 md:mr-14">
        <button onClick={handleAddMoreMedicineClick} className="mb-4 ">
            <Button title={"Request New Medicine"} />
          </button>
        </div>
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        ChildrenStyle="overflow-y-auto"
      >
        <div className="p-4 ">
          <h2 className="text-xl font-bold mb-4">
            {isAddingNewMedicine ? "Request New Medicine" : "Request Medicine"}
          </h2>

          {isAddingNewMedicine ? (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Medicine Name
              </label>
              <input
                type="text"
                className="shadow-sm p-4 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block md:w-1/2 w-full sm:text-sm rounded-md"
                value={newMedicineName}
                onChange={(e) => setNewMedicineName(e.target.value)}
                placeholder="Enter medicine name"
              />
            </div>
          ) : (
            selectedMedicine && (
              <p className="mb-4">
                Medicine Name:{" "}
                <span className="font-semibold text-brightColor">
                  {selectedMedicine.medicineName}
                </span>
              </p>
            )
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Request Quantity
            </label>
            <input
              type="number"
              className="shadow-sm p-4 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block md:w-1/2 w-full sm:text-sm rounded-md"
              value={requestedQuantity}
              onChange={(e) => setRequestedQuantity(e.target.value)}
              placeholder="Enter quantity"
            />
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
              Submit Request
            </button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default ListofMedicine;
