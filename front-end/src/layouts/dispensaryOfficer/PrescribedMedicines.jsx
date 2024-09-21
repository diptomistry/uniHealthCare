import React, { useState, useEffect } from 'react';
import SearchHeader from '../../models/dashboard/SearchBar';
import { SearchResultsList } from '../../components/dashboard/doctor/prescription/SearchResultsList';
import axios from 'axios';
const calculateTotalQuantity = (quantity, duration) => {
  // Standardize the quantity format to use '-' as the delimiter
  const standardizedQuantity = quantity.replace(/\+/g, '-');
  //const [morning, afternoon, evening] = quantity.split('-').map(Number);
  // Split the quantity and convert to numbers
  const [morning, afternoon, evening] = standardizedQuantity.split('-').map(Number);
  const totalDosesPerDay = morning + afternoon + evening;

  // Extract the number of days from the duration (assuming it's in format "X Days")
  const days = parseInt(duration.split(' ')[0], 10);

  // Calculate total quantity of medicine
  const totalQuantity = totalDosesPerDay * days;
  return totalQuantity;
};
const PrescribedMedicines = ({ userID,closeModal }) => {
  // Structure to store medicines per appointment
  const [appointmentsMedicines, setAppointmentsMedicines] = useState({});

  const fetchAppointments = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8000/api/appointments/${userID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
  
    const formattedData = data.reduce((acc, appointment) => {
      if (appointment.prescription) {
        const medicines = appointment.prescription.prescribedMedicines.map((medicine) => ({
          id: medicine.medicine.medicineID,
          name: medicine.medicine.name,
          isChecked: !medicine.medicine.is_Outside, // Default to true for prescribed medicines
          quantity: calculateTotalQuantity(medicine.quantity, medicine.duration),
          type: medicine.medicine.is_Outside ? 'manual' : 'search',
          isEditing: false, // Default to false, you can update this as needed
        }));
        
        acc[appointment.appointmentID] = medicines;
      }
      return acc;
    }, {});
    console.log('Formatted Data:', formattedData);
  
    setAppointmentsMedicines(formattedData);
  };
  
  useEffect(() => {
    fetchAppointments();
  }, []);
  

  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [medicineOptions, setMedicineOptions] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/medicines/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const formattedMedicines = response.data.map((medicine) => ({
          name: medicine.name,
          medicineID: medicine.medicineID,
        }));

        setMedicineOptions(formattedMedicines);
      } catch (err) {
        console.error('Error fetching medicines:', err);
      }
    };

    fetchMedicines();
  }, []);

  const handleTick = (appointmentId, id) => {
    setAppointmentsMedicines((prev) => ({
      ...prev,
      [appointmentId]: prev[appointmentId].map((med) =>
        med.id === id ? { ...med, isChecked: !med.isChecked, isEditing: !med.isChecked ? false : med.isEditing } : med
      ),
    }));
  };

  const handleQuantityChange = (appointmentId, id, quantity) => {
    setAppointmentsMedicines((prev) => ({
      ...prev,
      [appointmentId]: prev[appointmentId].map((med) =>
        med.id === id ? { ...med, quantity: parseInt(quantity) || null } : med
      ),
    }));
  };

  const handleMedicineChange = (appointmentId, id, name) => {
    setAppointmentsMedicines((prev) => ({
      ...prev,
      [appointmentId]: prev[appointmentId].map((med) =>
        med.id === id ? { ...med, name, isEditing: false } : med
      ),
    }));
  };

  const handleSearchChange = (input) => {
    setSearchInput(input);
    if (input) {
      const filteredResults = medicineOptions.filter((medicine) =>
        medicine.name && medicine.name.toLowerCase().includes(input.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  // const handleSelectMedicine = (name, medicineID) => {
  //   setSearchResults([]);
  // };

  const handleEditMedicine = (appointmentId, id, name) => {
    const selectedMedicine = appointmentsMedicines[appointmentId].find((med) => med.id === id);
    setSearchInput(selectedMedicine.name);
    setAppointmentsMedicines((prev) => ({
      ...prev,
      [appointmentId]: prev[appointmentId].map((med) =>
        med.id === id ? { ...med, isEditing: true } : med
      ),
    }));
  };

  const handleSubmit = (appointmentId) => {
    // Extract the selected medicines for the given appointment
    const selectedMedicines = appointmentsMedicines[appointmentId]
      .filter((med) => med.isChecked && med.quantity > 0)
      .map((med) => ({
        prescribedMedicineId: med.id, // Map medicine.id to prescribedMedicineId
        dispensedQuantity: med.quantity // Map medicine quantity to dispensedQuantity
      }));
  
    // Structure the request payload
    const payload = {
      appointmentId: parseInt(appointmentId), // Pass the appointmentId
      dispensedMedicines: selectedMedicines // Pass the selected medicines
    };
    console.log('Payload:', payload);
  
    // Get the bearer token from local storage
    const token = localStorage.getItem('token'); // Ensure this matches your stored token key
  
    // Make the POST request
    fetch('http://localhost:8000/api/dispense-requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Use the bearer token for authentication
      },
      body: JSON.stringify(payload) // Send the payload as a JSON string
    })
      .then(async (response) => {
        // Check if the response has a body before parsing it as JSON
        if (!response.ok) {
          return Promise.reject(`Error: ${response.status} ${response.statusText}`);
        }
        const text = await response.text();
        return text ? JSON.parse(text) : null;
      })
      .then((data) => {
        console.log('Response:', data);
        closeModal();
        // Handle the success response (data may be null if there's no response body)
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error, e.g., show an error message
      });
  };
  
  

  return (
    <div className="p-4 bg-white rounded shadow-md">
      {Object.keys(appointmentsMedicines).map((appointmentId) => (
        <div key={appointmentId} className="mb-6">
          <h2 className="text-lg font-bold mb-4">Prescribed Medicines - Appointment {appointmentId}</h2>
          <ul>
            {appointmentsMedicines[appointmentId].map((med) => (
              <li key={med.id} className="flex items-center justify-between mb-2 p-2 border-b">
                <div className="flex-1 mr-4">
                  {med.type === 'manual' && med.isChecked && med.isEditing ? (
                    <>
                      <SearchHeader input={searchInput} handleChange={handleSearchChange} />
                      <SearchResultsList
                        results={searchResults}
                        onItemSelect={(name, id) => handleMedicineChange(appointmentId, med.id, name)}
                      />
                    </>
                  ) : (
                    <span>{med.name}</span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  {med.type === 'manual' && med.isChecked && !med.isEditing && (
                    <button
                      onClick={() => handleEditMedicine(appointmentId, med.id, med.name)}
                      className="underline"
                    >
                      Search Name
                    </button>
                  )}
                  <input
                    type="number"
                    min="0"
                    value={med.quantity}
                    onChange={(e) => handleQuantityChange(appointmentId, med.id, e.target.value)}
                    disabled={!med.isChecked}
                    className="w-16 p-2 border rounded"
                  />
                  <label className="flex flex-row items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={med.isChecked}
                      onChange={() => handleTick(appointmentId, med.id)}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 flex rounded-md border peer-checked:bg-primaryColor transition">
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 stroke-white"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 12.6111L8.92308 17.5L20 6.5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </div>
                  </label>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-end">
            <button
              onClick={() => handleSubmit(appointmentId)}
              className="mt-4 px-6 py-2 bg-primaryColor text-white rounded hover:bg-hoverColor"
            >
              Submit Appointment {appointmentId}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrescribedMedicines;
