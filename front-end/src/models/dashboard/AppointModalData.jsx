import React, { useState,useEffect,useContext } from "react";
import {
  CardioLogyDoctorDutyRoster,
  EyeDoctorDutyRoster,
  DentalDoctorDutyRoster,
} from "../../assets/dashboard";
import { AloSchedule } from "../../assets/dashboard";
import { UserContext } from "../../services/auth/UserProvider";
import PastRecord from "../../layouts/dashboard/PastRecord";
import axios from "axios";
const AppointmentModalData = ({ modalContent }) => {
  const [description, setDescription] = useState("");
  const [departmentResponse, setDepartmentResponse] = useState("");
  const [isResponseReceived, setIsResponseReceived] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [departmentList, setDepartmentList] = useState([]);
  const { user } = useContext(UserContext);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  console.log(user.userID);
  const [dutyRoster, setDutyRoster] = useState([]);
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
  //trim \n from department response. '\n' is a string
const specialization = departmentResponse.slice(0, -1).trim(); 
  
useEffect(() => {
  const fetchDutyRoster = async () => {
    console.log("Specialization from departmentResponse:", specialization); // Debugging specialization value
    
    try {
      const token = localStorage.getItem("token"); // Fetch bearer token from localStorage
      const response = await axios.get("http://localhost:8000/api/duty-roster/table", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass bearer token
        },
      });

      // Log the entire response to check the structure and the data
      console.log("Duty Roster API Response:", response.data);

      // Filter the duty roster by specialization
      const filteredRoster = response.data.map((day) => ({
        ...day,
        slots: day.slots.map((slot) => ({
          ...slot,
          doctors: slot.doctors.filter((doctor) => {
           // console.log("Doctor Specialization:", doctor.specialization); // Debugging doctor specialization
            return doctor.specialization === specialization;
          }),
        })),
      }));

      console.log("Filtered Roster:", filteredRoster); // Check filtered results
      setDutyRoster(filteredRoster);
    } catch (error) {
      console.error("Error fetching duty roster:", error);
    }
  };

  fetchDutyRoster();
}, [specialization]);

  useEffect(() => {
    // Fetch the department list from the API
   
   
    fetchDepartments();
  }, []);

  const handleDescriptionSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const departmentListString = departmentList.join(", ");
      console.log("Department List: ", departmentListString);
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
            departmentListString,
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
  const handleAppointmentConfirm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const appointmentDateTime = `${appointmentDate}T${appointmentTime}`;

    try {
      const token = localStorage.getItem("token"); // Retrieve bearer token from local storage
      const response = await fetch("http://localhost:8000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.userID,
          appointmentDateTime,
          concern: description,
          status: "Scheduled",
        }),
      });

      if (response.ok) {
        // Handle success, e.g., show a success message or redirect
        alert("Appointment confirmed!");
      } else {
        console.error("Error confirming appointment");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const showAlert = departmentResponse.toLowerCase().includes("please");

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
              <form className="space-y-4" onSubmit={handleAppointmentConfirm}>
                <div>
                  <label className="block text-gray-700">Select Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Select Time</label>
                  <input
                    type="time"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primaryColor hover:bg-hoverColor text-white font-bold py-2 px-4 rounded mt-4"
                  disabled={isLoading || !appointmentDate || !appointmentTime}
                >
                  {isLoading ? "Confirming..." : "Confirm Appointment"}
                </button>
              </form>
              <div className="mt-6 mx-auto p-4 ">
                <h3 className="text-lg font-bold">
                  Doctor Duty Roster for {departmentResponse} Department:
                </h3>
                {dutyRoster.length > 0 ? (
        <table className="table-auto border-collapse border border-gray-300 w-full text-left">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Day</th>
              <th className="border border-gray-300 px-4 py-2">Time Slot</th>
              <th className="border border-gray-300 px-4 py-2">Doctors</th>
            </tr>
          </thead>
          <tbody>
            {dutyRoster.map((day, dayIndex) =>
              day.slots.map((slot, slotIndex) => (
                <tr key={`${dayIndex}-${slotIndex}`}>
                  {slotIndex === 0 && (
                    <td
                      className="border border-gray-300 px-4 py-2"
                      rowSpan={day.slots.length}
                    >
                      {day.dayOfWeek}
                    </td>
                  )}
                  <td className="border border-gray-300 px-4 py-2">
                    {slot.slotTime}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-brightColor">
                    {slot.doctors.length > 0 ? (
                      slot.doctors.map((doctor) => doctor.name).join(", ")
                    ) : (
                      <span className="text-gray-300">No doctors available</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      ): (
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
