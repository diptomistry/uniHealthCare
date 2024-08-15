import React from "react";

const PatientPrescriptionForm = ({ prescriptionData }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md ">
      <h2 className="text-2xl font-bold text-center mb-4">
        {prescriptionData.title}
      </h2>
      <div className="bg-blue-100 p-4 rounded-xl mb-4">
        <h3 className="text-lg font-semibold">Medicine Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prescriptionData.medicines.map((medicine, index) => (
            <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
              <p className="font-medium text-brightColor">Diagnosis: {medicine.diagnosis}</p>
              <p className="">Medicine Name: <span className="text-textColor font-medium">{medicine.name}</span></p>
              <p className="">Quantity: {medicine.quantity}</p>
              <p className="">
                Duration: {medicine.duration} {medicine.durationUnit}
              </p>
              <p className="">Time: {medicine.time}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-100 p-4 rounded-xl">
        <h3 className="text-lg font-semibold">Instructions from Doctor</h3>
        <p className="mt-2">{prescriptionData.additionalInstructions}</p>
      </div>
    </div>
  );
};

export default PatientPrescriptionForm;
