import React from "react";

const PatientPrescriptionForm = ({ prescriptionData }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">
        {prescriptionData.title}
      </h2>
      <div className="bg-blue-100 p-4 rounded-xl mb-4">
        <h3 className="text-lg font-semibold">Medicine Details</h3>
        {prescriptionData.medicines.map((medicine, index) => (
          <div key={index} className="mt-2">
            <p className="font-medium">Medicine Name: {medicine.name}</p>
            <p className="font-medium">Quantity: {medicine.quantity}</p>
            <p className="font-medium">
              Duration: {medicine.duration} {medicine.durationUnit}
            </p>
            <p className="font-medium">Time: {medicine.time}</p>
          </div>
        ))}
      </div>
      <div className="bg-gray-100 p-4 rounded-xl">
        <h3 className="text-lg font-semibold">Instructions from Doctor</h3>
        <p className="mt-2">{prescriptionData.additionalInstructions}</p>
      </div>
    </div>
  );
};

export default PatientPrescriptionForm;
