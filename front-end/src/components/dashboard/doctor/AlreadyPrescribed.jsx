import React, { useRef, useState } from 'react';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Toolbar,
  Search
} from '@syncfusion/ej2-react-grids';
import CustomModal from "../../../models/CustomModal";
import DrugPrescription from "./prescription/DrugPrescription";
import PrimaryButton from "../../../layouts/dashboard/PrimaryButton";

const AlreadyPrescribed = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const gridInstance = useRef(null);

  // Sample data - replace with your actual data
  const patientsData = [
    { PatientID: 1, Name: 'John Doe', Age: 35, Gender: 'Male' },
    { PatientID: 2, Name: 'Jane Smith', Age: 28, Gender: 'Female' },
    // ... more patient data
  ];

  // Define your columns
  const patientsGrid = [
    { field: 'PatientID', headerText: 'ID', width: '100', textAlign: 'Right' },
    { field: 'Name', headerText: 'Name', width: '150' },
    { field: 'Age', headerText: 'Age', width: '100', textAlign: 'Right' },
    { field: 'Gender', headerText: 'Gender', width: '120' },
  ];

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  // Get Medicines Data
  const getMedicines = (medicinesData) => {
    setMedicines(medicinesData);
  };

  // Toolbar click handler
  const toolbarClick = (args) => {
    if (gridInstance.current) {
      if (args.item.id === 'gridcomp_excelexport') {
        gridInstance.current.excelExport();
      } else if (args.item.id === 'gridcomp_pdfexport') {
        gridInstance.current.pdfExport();
      }
    }
  };

  // Button click handler
  const handleButtonClick = (patient) => {
    console.log('Button clicked for patient:', patient.PatientID);
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  return (
    <div>
      <GridComponent
        id="gridcomp"
        dataSource={patientsData}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        editSettings={{ allowDeleting: true, allowEditing: true }}
        toolbar={['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'ExcelExport', 'PdfExport', 'Search']}
        toolbarClick={toolbarClick}
        ref={gridInstance}
      >
        <ColumnsDirective>
          {patientsGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
          <ColumnDirective
            field="action"
            headerText="Action"
            width="120"
            template={(props) => (
              <button onClick={() => handleButtonClick(props)}>
                View Details
              </button>
            )}
          />
        </ColumnsDirective>
        <Inject
          services={[
            Resize,
            Sort,
            ContextMenu,
            Filter,
            Page,
            ExcelExport,
            PdfExport,
            Edit,
            Toolbar,
            Search,
          ]}
        />
      </GridComponent>
      {selectedPatient && (
        <CustomModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          ChildrenStyle="overflow-y-auto"
        >
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
                      {selectedPatient.Name}
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
                  selectedPatient.Name,
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
        </CustomModal>
      )}
    </div>
  );
};

export default AlreadyPrescribed;
