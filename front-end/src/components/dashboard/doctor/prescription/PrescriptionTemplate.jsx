import React from "react";

const PrescriptionTemplate = ({ data, userType }) => {
  const medications = [
    {
      name: "Expectorant",
      duration: "1 Week",
      time: "Before Food",
      frequency: "1-0-1",
    },
    {
      name: "Paracetamol",
      duration: "5 Days",
      time: "After Food",
      frequency: "0-1-1",
    },
    {
      name: "Anti-biotic",
      duration: "3 Weeks",
      time: "After Food",
      frequency: "1-1-0",
    },
    {
      name: "Vitamin C",
      duration: "6 Days",
      time: "Before Food",
      frequency: "0-0-1",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg overflow-hidden">
      {userType !== "dispensary-officer" && (
        <>
          <h1 className="text-2xl font-bold text-purple-800 mb-6 text-center sm:text-xl">
            PRESCRIPTION DETAILS
          </h1>
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold text-purple-800 mb-4 sm:text-lg">
              Patient Information
            </h2>
            <div>
              <p className="font-semibold text-textColor">Prescription Date</p>
              <p>{data.AppointmentDate}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <p className="font-semibold text-purple-800">Name</p>
              <p>{data.PatientName}</p>
            </div>
            <div>
              <p className="font-semibold text-purple-800">Age</p>
              <p>30</p>
            </div>
            <div>
              <p className="font-semibold text-purple-800">Phone Number</p>
              <p>{data.PhoneNum}</p>
            </div>
            <div>
              <p className="font-semibold text-purple-800">Date of Birth</p>
              <p>Wednesday, November 8, 1989</p>
            </div>
            <div>
              <p className="font-semibold text-purple-800">Email</p>
              <p className="break-words">{data.Email}</p>
            </div>
            <div>
              <p className="font-semibold text-purple-800">Gender</p>
              <p>{data.Gender}</p>
            </div>
            <div>
              <p className="font-semibold text-purple-800">Address</p>
              <p>1372 Payne Street Richlands, VA, 24641</p>
            </div>
            <div>
              <p className="font-semibold text-purple-800">Diagnosis</p>
              <p className="text-white  px-4 capitalize rounded-xl text-md bg-hoverColor w-fit">
                Fever
              </p>
            </div>
          </div>
        </>
      )}

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
            {medications.map((med, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="border p-2">{med.name}</td>
                <td className="border p-2">{med.duration}</td>
                <td className="border p-2">{med.time}</td>
                <td className="border p-2">{med.frequency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {userType !== "dispensary-officer" && (
        <div className="mt-5 bg-gray-100 p-4 rounded-xl">
          <h3 className="text-lg font-semibold">Instructions</h3>
          <p className="mt-2">Stay hydrated and rest well.</p>
        </div>
      )}
    </div>
  );
};

export default PrescriptionTemplate;
