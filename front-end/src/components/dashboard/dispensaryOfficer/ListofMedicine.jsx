import React, { useState,useEffect,useContext } from "react";
import List from "../doctor/List";
import CustomModal from "../../../models/CustomModal";
import { medicineData, medicineGrid } from "../../../assets/dashboard";
import { UserContext } from "../../../services/auth/UserProvider";
import axios from "axios";


const ListofMedicine = () => {
  const { user } = useContext(UserContext);
  const toolbarOptions = [
    "Search",
    "PdfExport",
    "ExcelExport",
    "CsvExport",
    
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [requestedQuantity, setRequestedQuantity] = useState("");
 

 
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
            medicineName: `id:${medicine.medicineID} ${medicine.name}`,
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
   
  };

 

  const closeModal = () => {
    setIsModalOpen(false);
    setRequestedQuantity(""); // Reset the quantity field when closing the modal
   // Reset the new medicine name field
  };
  const getMedicineId = (name) => {
    if (!name) return null;
    const idMatch = name.match(/id:(\d+)/);
    return idMatch ? idMatch[1] : null;
  };
  
  // Method to get the medicine name
  const getName = (name) => {
    if (!name) return null;
    const Medname = name.replace(/id:\d+\s*/, '').trim();
    return Medname;
  };

  const handleRequestSubmit = async (name) => {
    const medicineId = getMedicineId(name);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost:8000/api/medicine-requests',
        {
          requestedBy: user.userID,
          stockEndDate: "2024-10-15",
          medicineID: medicineId,
          quantity: requestedQuantity, 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token
            'Content-Type': 'application/json', // Ensure the request is sent as JSON
          },
        }
      );

      console.log('Request Successful:', response.data);
      alert('Medicine request submitted successfully!');
      closeModal(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error submitting request:', error.response?.data || error.message);
      alert('There was an error submitting your request. Please try again.');
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

      

      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        ChildrenStyle="overflow-y-auto"
      >
        <div className="p-4 ">
          <h2 className="text-xl font-bold mb-4">
          Request Medicine
          </h2>

          {selectedMedicine && (
            <div>
              <p className="mb-4">
              Medicine Name:{" "}
              <span className="font-semibold text-brightColor">
                {getName(selectedMedicine.medicineName)}
              </span>
            </p>
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
           </div>
          )}

         

          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </button>
            <button
              onClick={() => handleRequestSubmit(selectedMedicine.medicineName)}
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
