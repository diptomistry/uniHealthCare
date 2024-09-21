import React, { useContext } from "react";
import { UserContext } from "../../../../services/auth/UserProvider";

const PrescriptionTemplate = ({ data }) => {
  const { user } = useContext(UserContext);
  console.log(data);
  
  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg overflow-hidden">
      <h1 className="text-2xl font-bold text-purple-800 mb-6 text-center sm:text-xl">
        PRESCRIPTION DETAILS
      </h1>
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold text-purple-800 mb-4 sm:text-lg">
          Doctor Information
        </h2>
        <div>
          <p className="font-semibold text-textColor">Prescription Date</p>
          <p>{data.AppointmentDate}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <p className="font-semibold text-purple-800">Doctor Name</p>
          <p>{data.DoctorName}</p>
        </div>
        <div>
          <p className="font-semibold text-purple-800">Specialization</p>
          <p>{data.Specialization}</p>
        </div>
        <div>
          <p className="font-semibold text-brightColor">Patient Name</p>
          <p>{user.name}</p>
        </div>
        <div>
          <p className="font-semibold text-brightColor">Diagnosis</p>
          <p className="text-white px-4 capitalize rounded-xl text-md bg-hoverColor w-fit">
            {data.Diagnosis}
          </p>
        </div>
      </div>

      <h2 className="mt-5 text-xl font-semibold text-purple-800 mb-4 sm:text-lg">
        List of Prescribed Medications
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-purple-100">
              <th className="border p-2 text-left">Medication Name</th>
              <th className="border p-2 text-left">Duration</th>
              <th className="border p-2 text-left">Time</th>
              <th className="border p-2 text-left">Frequency</th>
            </tr>
          </thead>
          <tbody>
            {data.medications && data.medications.length > 0 ? (
              data.medications.map((med, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="border p-2">{med.name}</td>
                  <td className="border p-2">{med.duration}</td>
                  <td className="border p-2">{med.time}</td>
                  <td className="border p-2">{med.frequency}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border p-2 text-center">
                  No medications prescribed.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-5 bg-gray-100 p-4 rounded-xl">
        <h3 className="text-lg font-semibold">Instructions</h3>
        <p className="mt-2">Stay hydrated and rest well.</p>
      </div>
    </div>
  );
};

export default PrescriptionTemplate;
