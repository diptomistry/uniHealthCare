import React, { useState,useEffect } from "react";
import {
  CardioLogyDoctorDutyRoster,
  EyeDoctorDutyRoster,
  DentalDoctorDutyRoster,
} from "../../assets/dashboard";
import PastRecord from "../../layouts/dashboard/PastRecord";
const AppointmentModalData = ({ modalContent }) => {
  const [description, setDescription] = useState("");
  const [departmentResponse, setDepartmentResponse] = useState("");
  const [isResponseReceived, setIsResponseReceived] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [departmentList, setDepartmentList] = useState([]);

  //const departmentList = ["Cardiology", "Dentistry", "Eye Care"];
  useEffect(() => {
    // Fetch the department list from the API
    const fetchDepartments = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve bearer token from local storage
        const response = await fetch("http://localhost:8000/api/departments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const departments = data.map((dept) => dept.name);
          
          setDepartmentList(departments); // Assuming 'departments' is the key in the response
       
        } else {
          console.error("Failed to fetch department list");
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleDescriptionSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Department List: ", departmentList);
      const response = await fetch("http://127.0.0.1:5000/diagnose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_input:
            "Patient symptoms: " +
            description +
            " Department List: " +
            departmentList,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setDepartmentResponse(data.response);
        console.log(data);
        setIsResponseReceived(true);
      } else {
        console.error("Error submitting description");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const showAlert = departmentResponse.toLowerCase().includes("please");
  const dutyRoster =
    departmentResponse === "Cardiology \n"
      ? CardioLogyDoctorDutyRoster
      : departmentResponse === "Dentistry \n"
      ? DentalDoctorDutyRoster
      : departmentResponse === "Eye care \n"
      ? EyeDoctorDutyRoster
      : [];
      const appointments = [
        {
          date: '2024-08-25',
          doctorName: 'Dr. Smith',
          status: 'completed',
        },
        {
          date: '2024-08-20',
          status: 'pending',
        },
        {
          date: '2024-08-15',
          doctorName: 'Dr. Williams',
          status: 'completed',
        },
      ];
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{modalContent}</h2>
      {modalContent === "Book Appointment" && (
        <div>
          <form className="space-y-4" onSubmit={handleDescriptionSubmit}>
            {isResponseReceived && showAlert && (
              <div className="rounded-md bg-red-50 p-4 text-sm text-red-500 mt-5">
                <b>Alert : </b> {departmentResponse}
              </div>
            )}
            {(!isResponseReceived || showAlert) && (
              <div>
                <label className="block text-gray-700">
                  Describe the Problem
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="4"
                  placeholder="Describe your symptoms or the issue..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            )}
            {(!isResponseReceived || showAlert) && (
              <button
                type="submit"
                className="bg-primaryColor hover:bg-hoverColor text-white font-bold py-2 px-4 rounded mt-4"
                disabled={isLoading || !description.trim()}
              >
                {isLoading ? "Submitting..." : "Submit Description"}
              </button>
            )}
          </form>
          {isResponseReceived && !showAlert && (
            <div>
              <p className="mb-4 text-green-600">
                Department Recommendation: {departmentResponse}
              </p>
              <p className="mb-4">
                Please select a convenient date and time to confirm your
                appointment with the DU Medical Centre.
              </p>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700">Select Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Select Time</label>
                  <input
                    type="time"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primaryColor hover:bg-hoverColor text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Confirm Appointment
                </button>
              </form>
              <div className="mt-6 mx-auto p-4 ">
                <h3 className="text-lg font-bold">
                  Doctor Duty Roster for {departmentResponse} Department:
                </h3>
                {dutyRoster.length > 0 ? (
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b text-left">
                          Doctor Name
                        </th>
                        <th className="py-2 px-4 border-b text-left">Day</th>
                        <th className="py-2 px-4 border-b text-left">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dutyRoster.map((duty, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }
                        >
                          <td className="py-2 px-4 border-b">
                            {duty.doctorName}
                          </td>
                          <td className="py-2 px-4 border-b">{duty.day}</td>
                          <td className="py-2 px-4 border-b">
                            {duty.startTime} to {duty.endTime}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-600">
                    No duty roster available for this department.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      {modalContent === "Past Record" && <PastRecord appointments={appointments}/>}
    </div>
  );
};

export default AppointmentModalData;
