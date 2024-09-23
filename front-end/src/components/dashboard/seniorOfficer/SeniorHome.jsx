import React, { useState, useEffect } from "react";
import { FaPills, FaExclamationTriangle } from 'react-icons/fa';
import { CgDanger } from 'react-icons/cg';
import GenericPieChart from "../charts/GenericPieChart"; 
import { top10MedicineSales } from "../../../assets/dashboard"; // Assuming this is imported correctly

const SeniorHome = () => {
  const [medicineSummary, setMedicineSummary] = useState([]);
  const [error, setError] = useState(null); // To handle and show errors

  // Fetch data when the component is mounted
  useEffect(() => {
    const fetchMedicineData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("Token not found. Please log in.");
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/stats', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const medicines = data.medicines;
          console.log('Medicine data:', medicines);
          // Update the medicine summary dynamically
          const updatedMedicineSummary = [
            {
              icon: <FaPills />,
              amount: medicines.available || 0,
              percentage: "+0%", // Adjust percentage logic if needed
              title: "Available Medicine",
              iconColor: "rgb(229, 255, 244)",
              iconBg: "rgb(0, 123, 255)",
              pcColor: "red-600",
            },
            {
              icon: <FaPills />,
              amount: medicines.lowStock || 0,
              percentage: "+0%", // Adjust percentage logic if needed
              title: "Low Stock Medicine",
              iconColor: "rgb(255, 244, 229)",
              iconBg: "rgb(254, 201, 15)",
              pcColor: "green-600",
            },
            {
              icon: <FaExclamationTriangle />,
              amount: medicines.outOfStock || 0,
              percentage: "+0%", // Adjust percentage logic if needed
              title: "Out of Stock Medicine",
              iconColor: "rgb(228, 106, 118)",
              iconBg: "rgb(255, 244, 229)",
              pcColor: "green-600",
            },
            {
              icon: <CgDanger />,
              amount: medicines.expired || 0,
              percentage: "-0%", // Adjust percentage logic if needed
              title: "Expired Medicine",
              iconColor: "rgb(255, 99, 132)",
              iconBg: "rgb(255, 235, 238)",
              pcColor: "red-700",
            },
          ];

          setMedicineSummary(updatedMedicineSummary);
        } else {
          setError("Failed to fetch data. Please try again.");
        }
      } catch (error) {
        setError("Error fetching medicine data. Please check your connection.");
      }
    };

    fetchMedicineData();
  }, []);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>} {/* Error display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full ">
        {medicineSummary.map((item, index) => (
          <div
            key={index} // Using index for keys since icons/titles are static. Consider using unique IDs if possible.
            className="bg-white hover:scale-105 dark:text-gray-200 dark:bg-secondary-dark-bg p-4 pt-9 rounded-2xl shadow-md flex flex-col justify-between"
          >
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl self-start"
            >
              {item.icon}
            </button>
            <div>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
              </p>
              <p className="text-sm text-gray-400 mt-1">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white dark:bg-secondary-dark-bg mt-10 mb-3 rounded-2xl shadow-md">
        <GenericPieChart 
          data={top10MedicineSales} 
          title="Top 10<br>Medicine Distribution"
        />
      </div>
    </div>
  );
};

export default SeniorHome;
