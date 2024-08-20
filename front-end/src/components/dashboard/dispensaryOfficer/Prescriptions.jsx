import React,{useState} from 'react'
import { AlreadyPrescribedPatientsDataDoctor } from '../../../assets/dashboard'
import { patientsDataDoctorGrid } from '../../../assets/dashboard'
import List from '../doctor/List'

import CustomModal from '../../../models/CustomModal'
import PrescribedMedicines from '../../../layouts/dispensaryOfficer/PrescribedMedicines'
const Prescriptions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const toolbarOptions = ["Search",];
  const handleButtonClick = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
    console.log("Button clicked for patient:", patient);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  return (
     <div className="bg-white dark:bg-secondary-dark-bg rounded-2xl shadow-md p-10">
    <List
      title="Prescriptions"
      patientsData={AlreadyPrescribedPatientsDataDoctor}
      patientsGrid={patientsDataDoctorGrid}
      toolbarOptions={toolbarOptions}
      onButtonClick={handleButtonClick} // Pass the handler to List
      status="View"
    />
       <CustomModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        ChildrenStyle="overflow-y-auto"
      >
        {selectedPatient && (
          <PrescribedMedicines data={selectedPatient}  />
        )}
      
      </CustomModal>
    </div>
  )
}

export default Prescriptions