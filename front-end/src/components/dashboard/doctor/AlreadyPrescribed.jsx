import React from 'react'
import { AlreadyPrescribedPatientsDataDoctor } from '../../../assets/dashboard'
import { patientsDataDoctorGrid } from '../../../assets/dashboard'
import List from './List'
const AlreadyPrescribed = () => {
  const toolbarOptions = ["Search", "PdfExport", "ExcelExport", "CsvExport"];
  const handleButtonClick = (patient) => {
    console.log("Button clicked for patient:", patient);
  };

  return (
     <div className="bg-white dark:bg-secondary-dark-bg rounded-2xl shadow-md p-10">
    <List
      title="Already Prescribed"
      patientsData={AlreadyPrescribedPatientsDataDoctor}
      patientsGrid={patientsDataDoctorGrid}
      toolbarOptions={toolbarOptions}
      onButtonClick={handleButtonClick} // Pass the handler to List
      status="View"
    /></div>
  )
}

export default AlreadyPrescribed