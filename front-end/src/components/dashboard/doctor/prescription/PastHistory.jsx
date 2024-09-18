import React, { useEffect, useState } from "react";
import PatientPrescriptionForm from "./PatientPrescriptionFormPast";

const PastHistory = ({ appointmentID }) => {
  const appointmentID2 = 4; // Get the appointment ID from the parent component
 /*
  // Array of prescription data
  const prescriptions = [
    {
      title: "Prescription-1",
      diagnosis: "Fever and Cold",
      medicines: [
        {
          name: "Plane Napa",
          quantity: "1-0-1",
          duration: "2",
          durationUnit: "Weeks",
          time: "After Food",
        },
        {
          name: "Antibiotic X",
          quantity: "1-1-1",
          duration: "1",
          durationUnit: "Week",
          time: "Before Food",
        },
      ],
      additionalInstructions: "Stay hydrated and rest well.",
    },
    {
      title: "Prescription-2",
      diagnosis: "Headache",
      medicines: [
        {
          name: "Painkiller Y",
          quantity: "0-1-1",
          duration: "5",
          durationUnit: "Days",
          time: "After Food",
        },
      ],
      additionalInstructions: "Avoid heavy lifting.",
    },
    // Add more prescriptions as needed
  ];
*/
const [prescriptions, setPrescriptions] = useState([]);

useEffect(() => {
  const fetchPrescriptions = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the token from local storage
      const response = await fetch(`http://localhost:8000/api/appointments/${appointmentID}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token for authentication
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      console.log("data:", data);

      if (data && data.length > 0) {
        // Format the API response to match the desired structure
        const formattedPrescriptions = data.map((appointment, index) => {
          const prescription = appointment.prescription;

          return {
            title: `Prescription-${index + 1}`, // Dynamically generate prescription titles
            diagnosis: prescription.description,
            medicines: prescription.prescribedMedicines.map((medicine) => ({
              name: medicine.medicine.name,
              quantity: medicine.quantity,
              duration: medicine.duration.split(" ")[0], // Split to get the duration number
              durationUnit: medicine.duration.split(" ")[1], // Split to get the unit (Days, Weeks, etc.)
              time: medicine.afterBefore,
            })),
            additionalInstructions: "Follow doctor's advice.",
          };
        });

        console.log("formattedPrescriptions:", formattedPrescriptions);
        setPrescriptions(formattedPrescriptions);
      } else {
        console.log("No appointment data found");
      }
    } catch (error) {
      console.error("Error fetching prescription data:", error);
    }
  };

  if (appointmentID) {
    fetchPrescriptions();
  }
}, [appointmentID]);


  return (
    <div className="flex flex-col gap-5">
      {prescriptions.map((prescription, index) => (
        <PatientPrescriptionForm
          key={index}
          prescriptionData={prescription} 
        />
      ))}
    </div>
  );
};

export default PastHistory;
