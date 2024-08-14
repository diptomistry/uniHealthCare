import React from "react";
import PatientPrescriptionForm from "./PatientPrescriptionFormPast";

const PastHistory = () => {
  const prescriptionData1 = {
    title: "Prescription-1",
    medicineName: "Plane Napa",
    quantity: "1-0-1",
    duration: "2",
    durationUnit: "Weeks",
    time: "After Food",
    additionalInstructions: "Stay hydrated and rest well.",
  };
  const prescriptionData2 = {
    title: "Prescription-2",
    medicineName: "Plane Napa",
    quantity: "1-0-1",
    duration: "2",
    durationUnit: "Weeks",
    time: "After Food",
    additionalInstructions: "Stay hydrated and rest well.",
  };
  return (
    <div className="flex flex-col gap-5">
      <PatientPrescriptionForm prescriptionData={prescriptionData1} />
      <PatientPrescriptionForm prescriptionData={prescriptionData2} />
    </div>
  )
}

export default PastHistory