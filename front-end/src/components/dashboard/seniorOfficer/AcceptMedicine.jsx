import React, { useEffect, useState } from "react";
import axios from "axios";
import MedicineList from './MedicineList'


const AcceptMedicine = () => {
  const [medicineRequests, setMedicineRequests] = useState([]);

  useEffect(() => {
    const fetchMedicineRequests = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get("http://localhost:8000/api/medicine-requests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMedicineRequests(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching medicine requests:", error);
      }
    };

    fetchMedicineRequests();
  }, []);
  const handleAccept = async (id) => {
    //put with bearer token:http://localhost:8000/api/medicine-requests/id/status body: { "status":"APPROVED"}
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:8000/api/medicine-requests/${id}/status`,
        { status: "APPROVED" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMedicineRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status: "APPROVED" } : request
        )
      );
    } catch (error) {
      console.error("Error accepting medicine request:", error);
    }

    
   
  }
  const handleReject = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:8000/api/medicine-requests/${id}/status`,
        { status: "REJECTED" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMedicineRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status: "REJECTED" } : request
        )
      );
    } catch (error) {
      console.error("Error rejecting medicine request:", error);
    }
  }



  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Medicine Requests</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {medicineRequests.map((request) => (
          <div key={request.id} className="bg-white shadow-md rounded-lg p-4">
            {/* Medicine Image - First Letter */}
            <div className="flex justify-center items-center h-16 w-16 bg-[#E0E7FF] text-purple-800 rounded-full text-3xl font-bold mx-auto">
              {request.medicine.name[0].toUpperCase()}
            </div>

            {/* Medicine Info */}
            <div className="mt-4 text-center">
              <h2 className="text-xl font-semibold">{request.medicine.name}</h2>
              <p className="text-gray-500">{request.medicine.description}</p>
              <p className="text-gray-700 mt-2">Price: TK{request.medicine.price}</p>
              <p className="text-gray-700">Quantity Requested: {request.quantity}</p>
              <p className="text-gray-500">Request Date: {request.requestDate}</p>
              <p className="text-gray-500">Stock End Date: {request.stockEndDate}</p>
              <p className={`mt-2 text-sm font-bold ${request.status === "PENDING" ? "text-[#FB9678]" : "text-green-600"}`}>
                Status: {request.status}
              </p>
               {/* Accept and Reject Buttons */}
               <div className="mt-4 flex justify-around">
                <button
                  className="bg-primaryColor text-white px-4 py-2 rounded hover:bg-hoverColor transition"
                  onClick={() => handleAccept(request.id)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  onClick={() => handleReject(request.id)}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcceptMedicine