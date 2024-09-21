import React,{useState,useEffect} from 'react'
import { AlreadyPrescribedPatientsDataDoctor } from '../../../assets/dashboard'
import { patientsDataDoctorGrid } from '../../../assets/dashboard'
import List from '../doctor/List'
import axios from 'axios'

import CustomModal from '../../../models/CustomModal'
import PrescribedMedicines from '../../../layouts/dispensaryOfficer/PrescribedMedicines'
const Prescriptions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const toolbarOptions = ["Search",];

  const [appointments, setAppointments] = useState([]);
  const getuserID = (name) => {
    if (!name) return null; // If no name, return null
    const appIdMatch = name.match(/userID:(\d+)/); // Regex to match 'AppID:'
    if (appIdMatch && appIdMatch[1]) {
      return appIdMatch[1]; // Return the matched AppID number
    }
    return null; // Return null if no AppID is found
  };
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token'); // Fetch the token from localStorage
        const response = await axios.get('http://localhost:8000/api/appointments/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Filter appointments where status is "Prescribed"
        const prescribedAppointments = response.data.content.filter(appointment => appointment.status === 'Prescribed');

        // Formatting the data to match your required structure
        const formattedData = prescribedAppointments.map(appointment => ({
          AppointmentDate: new Date(appointment.appointmentDateTime).toLocaleDateString(),
          Email: appointment.user?.email || 'N/A',
          PhoneNum: appointment.user?.phone || 'N/A',
          PatientName: `userID:${appointment.user.userID} ${appointment.user?.name}` || 'N/A',
          Gender: appointment.user?.sex || 'N/A',
          StatusBg: '#03C9D7',
          PatientImage: appointment.user?.image || null,
        }));

        setAppointments(formattedData);
        console.log('Appointments:', formattedData);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);
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
      patientsData={appointments}
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
          <PrescribedMedicines  userID={getuserID(selectedPatient.PatientName)} closeModal={closeModal}  />
        )}
      
      </CustomModal>
    </div>
  )
}

export default Prescriptions