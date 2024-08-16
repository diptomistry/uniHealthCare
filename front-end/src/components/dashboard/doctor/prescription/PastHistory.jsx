import React from "react";
import PatientPrescriptionForm from "./PatientPrescriptionFormPast";

const PastHistory = () => {
  const prescriptionData1 = {
    title: "Prescription-1",
    diagnosis: "Fever and Cold", // Combined diagnosis
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
  };

  const prescriptionData2 = {
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
  };

  return (
    <div className="flex flex-col gap-5">
      <PatientPrescriptionForm prescriptionData={prescriptionData1} />
      <PatientPrescriptionForm prescriptionData={prescriptionData2} />
    </div>
  );
};

export default PastHistory;
