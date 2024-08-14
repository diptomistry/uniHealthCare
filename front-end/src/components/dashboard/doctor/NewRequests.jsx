import React, { useState, useEffect } from "react";
import List from "./List";
import { patientsDataDoctor, patientsDataDoctorGrid } from "../../../assets/dashboard";
import CustomModal from "../../../models/CustomModal";
import DrugPrescription from "./prescription/DrugPrescription";
import PrimaryButton from "../../../layouts/dashboard/PrimaryButton";

const NewRequests = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [medicines, setMedicines] = useState([]);

  const toolbarOptions = ["Search", "PdfExport", "ExcelExport", "CsvExport"];

  const handlePrescribeClick = (patient) => {
    setSelectedPatient(patient); // Set the selected patient
    setIsModalOpen(true); // Open the modal
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
        patientsData={patientsDataDoctor}
        patientsGrid={patientsDataDoctorGrid}
        toolbarOptions={toolbarOptions}
        onPrescribeClick={handlePrescribeClick} // Pass the handler to List
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
                  <button
                    type="button"
                    className="bg-slate-300 text-center w-48 rounded-2xl h-14 relative font-sans text-black text-xl font-semibold group"
                  >
                    <div className="bg-secondaryColor rounded-xl h-12 w-1/4 flex items-center justify-center absolute right-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
                      <svg
                        width="25px"
                        height="25px"
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="#000000"
                          d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                        ></path>
                        <path
                          fill="#000000"
                          d="M786.752 512 521.344 246.656a32 32 0 0 1 45.312-45.312l288 288a32 32 0 0 1 0 45.312l-288 288a32 32 0 0 1-45.312-45.312L786.752 512z"
                        ></path>
                      </svg>
                    </div>
                    <p className="translate-x-[-8px]">History</p>
                  </button>
                </div>
              </div>
            </div>
            <DrugPrescription getMedicines={getMedicines} />
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
          </div>
        )}
      </CustomModal>
    </div>
  );
};

export default NewRequests;

