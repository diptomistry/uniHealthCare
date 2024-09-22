import React, { useState, useContext, useEffect } from "react";
import List from "./List";
import {
  NewPatientsDataDoctor,
  patientsDataDoctorGrid,
} from "../../../assets/dashboard";
import CustomModal from "../../../models/CustomModal";
import DrugPrescription from "./prescription/DrugPrescription";
import PrimaryButton from "../../../layouts/dashboard/PrimaryButton";
import PastHistory from "./prescription/PastHistory";
import { CSSTransition } from "react-transition-group"; // For animation
import GeneralButton from "../../../layouts/doctor/GeneralButton";
import { UserContext } from "../../../services/auth/UserProvider";

const getAppID = (name) => {
  if (!name) return null; // If no name, return null
  const appIdMatch = name.match(/AppID:(\d+)/); // Regex to match 'AppID:'
  if (appIdMatch && appIdMatch[1]) {
    return appIdMatch[1]; // Return the matched AppID number
  }
  return null; // Return null if no AppID is found
};
const getuserID = (name) => {
  if (!name) return null; // If no name, return null
  const appIdMatch = name.match(/userID:(\d+)/); // Regex to match 'AppID:'
  if (appIdMatch && appIdMatch[1]) {
    return appIdMatch[1]; // Return the matched AppID number
  }
  return null; // Return null if no AppID is found
};
const getUserID = (name) => {
  if (!name) return null; // If no name, return null
  const userIdMatch = name.match(/userID:(\d+)/); // Regex to match 'userID:'
  if (userIdMatch && userIdMatch[1]) {
    return userIdMatch[1]; // Return the matched userID number
  }
  return null; // Return null if no userID is found
};

const NewRequests = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false); // Track whether to show history or prescription
  const [medicines, setMedicines] = useState([]);
  const [description, setDescription] = useState("");
  const todayDate = new Date().toLocaleDateString();
  const { user } = useContext(UserContext);
  const toolbarOptions = ["Search", "PdfExport", "ExcelExport", "CsvExport"];
  const [NewPatientsDataDoctor, setNewPatientsDataDoctor] = useState([]);
  // Helper function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust the age if the birthday hasn't happened yet this year
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8000/api/appointments/all", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Appointments data:", data);
        const appointData = data.content;
        const pendingAppointments = appointData.filter(
          (appointment) => appointment.status === "Scheduled" && appointment.user !== null
        );

        const transformedData = pendingAppointments.map((appointment) => ({
          AppointmentDate: formatDate(appointment.appointmentDateTime),
          Email: appointment.user?.email || "N/A",
          PhoneNum: appointment.user?.phone || "N/A",
          PatientName:
            `AppID:${appointment.appointmentID} userID:${appointment.user?.userID} ${appointment.user?.name} ` ||
            "Unknown",
          Gender: appointment.user?.sex || "Unknown",
          Age: appointment.user?.dob
            ? calculateAge(appointment.user.dob)
            : "Unknown", // Calculate age
          StatusBg: "#03C9D7", // Default color
          PatientImage:
            appointment.user?.image && appointment.user?.image !== "null"
              ? appointment.user.image
              : null, // Use image or placeholder
        }));
        setNewPatientsDataDoctor(transformedData); // Store the transformed data in state
        //console.log("Appointments data:", transformedData);
      })
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  const handlePrescribeClick = (patient) => {
    setSelectedPatient(patient); // Set the selected patient
    setShowHistory(false); // Ensure we're showing the prescription form
    setIsModalOpen(true); // Open the modal
  };

  const handleHistoryClick = () => {
    setShowHistory(true); // Switch to show history
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  const handleSubmitPrescription = () => {
    const appID = getAppID(selectedPatient.PatientName);
    console.log("AppID:", appID);
    const userID = getUserID(selectedPatient.PatientName);
    console.log("Prescription submitted", appID, userID);
    const prescriptionData = {
      description: description,
      date: todayDate,
      status: "Prescribed",
      doctorID: user.userID, // Update this dynamically if needed
      userID: parseInt(userID), // Dynamically set userID
      prescribedMedicines: medicines,
    };
    console.log("Prescription Data:", prescriptionData);

    const token = localStorage.getItem("token");

    fetch(`http://localhost:8000/api/appointments/${appID}/prescribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(prescriptionData),
    })
      .then((response) => {
        if (response.ok) {
          //console.log("Finaldata:", prescriptionData);
          console.log("Prescription submitted successfully");
          setIsModalOpen(false);
          setSelectedPatient(null);
          window.location.reload();
        } else {
          console.error("Failed to submit prescription");
        }
      })
      .catch((error) => console.error("Error submitting prescription:", error));
  };

  return (
    <div className="bg-white dark:bg-secondary-dark-bg rounded-2xl shadow-md p-10">
      <List
        title="New Requests"
        patientsData={NewPatientsDataDoctor}
        patientsGrid={patientsDataDoctorGrid}
        toolbarOptions={toolbarOptions}
        onButtonClick={handlePrescribeClick} // Pass the handler to List
        status="Prescribe"
      />

      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        ChildrenStyle="overflow-y-auto"
      >
        {selectedPatient && (
          <div>
            <div className="py-8 px-8 mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4">
              <div className="sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
                <img
                  className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
                  src={selectedPatient.PatientImage}
                  alt="Patient"
                />
                <div className="text-center flex gap-5 sm:text-left">
                  <div className="space-y-0.5">
                    <p className="text-lg text-black font-semibold">
                      {selectedPatient.PatientName}
                    </p>
                    <p className="text-slate-500 font-medium">Student</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-lg text-black font-semibold">Gender</p>
                    <p className="text-slate-500 font-medium">
                      {selectedPatient.Gender}
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-lg text-black font-semibold">Age</p>
                    <p className="text-slate-500 font-medium">
                      {selectedPatient.Age}
                    </p>
                  </div>
                </div>
                <div className="flex justify-center mt-2 mb-2">
                  <button className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
                    Message
                  </button>
                </div>
                <div className="flex justify-center">
                  {!showHistory ? (
                    <GeneralButton
                      label="History"
                      onClick={handleHistoryClick}
                      iconDirection="right"
                    />
                  ) : (
                    <GeneralButton
                      label="Go Back"
                      onClick={() => setShowHistory(false)}
                      iconDirection="left"
                    />
                  )}
                </div>
              </div>
            </div>

            <CSSTransition
              in={!showHistory}
              timeout={300}
              classNames="slide"
              unmountOnExit
            >
              <DrugPrescription
                getMedicines={setMedicines}
                setDescription={setDescription}
              />
            </CSSTransition>
            <CSSTransition
              in={showHistory}
              timeout={300}
              classNames="slide"
              unmountOnExit
            >
              <PastHistory
                appointmentID={getuserID(selectedPatient.PatientName)}
              />
            </CSSTransition>

            {!showHistory && (
              <button
                className="w-full mt-5"
                onClick={handleSubmitPrescription}
              >
                <PrimaryButton
                  title="Submit Prescription"
                  bgColor="bg-primaryColor hover:bg-hoverColor w-full"
                />
              </button>
            )}
          </div>
        )}
      </CustomModal>
    </div>
  );
};

export default NewRequests;
