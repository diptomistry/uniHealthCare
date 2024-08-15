import React, { useState } from "react";
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

const NewRequests = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false); // Track whether to show history or prescription
  const [medicines, setMedicines] = useState([]);

  const toolbarOptions = ["Search", "PdfExport", "ExcelExport", "CsvExport"];

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

  const getMedicines = (medicinesData) => {
    setMedicines(medicinesData);
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
                    <p className="text-slate-500 font-medium">21</p>
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

            {/* Transition between DrugPrescription and PastHistory */}
            <CSSTransition
              in={!showHistory}
              timeout={300}
              classNames="slide"
              unmountOnExit
            >
              <DrugPrescription getMedicines={getMedicines} />
            </CSSTransition>
            <CSSTransition
              in={showHistory}
              timeout={300}
              classNames="slide"
              unmountOnExit
            >
              <PastHistory />
            </CSSTransition>

            {!showHistory && (
              <button
                className="w-full mt-5"
                onClick={() => {
                  console.log(
                    "Submitting prescription for",
                    selectedPatient.PatientName,
                    medicines
                  );
                  closeModal();
                }}
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
