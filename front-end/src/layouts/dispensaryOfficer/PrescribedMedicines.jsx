import React, { useState,useEffect } from 'react';
import SearchHeader from '../../models/dashboard/SearchBar';
import { SearchResultsList } from '../../components/dashboard/doctor/prescription/SearchResultsList';
import axios from 'axios';

const PrescribedMedicines = ({userID }) => {


  const [medicines, setMedicines] = useState([
    { id: 1, name: 'Paracetamol', isChecked: true, quantity: 10, type: 'search', isEditing: false },
    { id: 2, name: 'Amoxicillin', isChecked: true, quantity: 10, type: 'search', isEditing: false },
    { id: 3, name: 'Ibuprofen', isChecked: false, quantity: 7, type: 'manual', isEditing: false },
    { id: 4, name: 'Vitamin C', isChecked: false, quantity: 7, type: 'manual', isEditing: false },
  ]);

  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMedicines, setSelectedMedicines] = useState({});
  const [medicineOptions, setMedicineOptions] = useState([]);

  // Dummy medicine options for search results
  const dummyMedicineOptions = [
    { name: 'Aspirin', medicineID: 1 },
    { name: 'Ibuprofen', medicineID: 2 },
    { name: 'Acetaminophen', medicineID: 3 },
    { name: 'Naproxen', medicineID: 4 },
    { name: 'Diphenhydramine', medicineID: 5 },
    { name: 'Hydrocodone', medicineID: 6 },
    { name: 'Omeprazole', medicineID: 7 },
    { name: 'Amoxicillin', medicineID: 8 },
    { name: 'Prednisone', medicineID: 9 },
    { name: 'Azithromycin', medicineID: 10 },
    { name: 'Losartan', medicineID: 11 },
    { name: 'Simvastatin', medicineID: 12 },
    { name: 'Lisinopril', medicineID: 13 },
    { name: 'Metformin', medicineID: 14 },
    { name: 'Atorvastatin', medicineID: 15 },
    { name: 'Albuterol', medicineID: 16 },
    { name: 'Levothyroxine', medicineID: 17 },
    { name: 'Gabapentin', medicineID: 18 },
    { name: 'Amlodipine', medicineID: 19 },
    { name: 'Metoprolol', medicineID: 20 },
   
  ];
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem('token');

        // Make the API request with the bearer token
        const response = await axios.get('http://localhost:8000/api/medicines/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Format the fetched medicines into the desired format
        const formattedMedicines = response.data.map((medicine) => ({
          name: medicine.name,
          medicineID: medicine.medicineID,
        }));

        // Set the formatted medicines to state
        setMedicineOptions(formattedMedicines);
      } catch (err) {
        // Handle any errors
        console.error('Error fetching medicines:', err);
      } 
    };

    fetchMedicines();
  }, []);



  const handleTick = (id) => {
    setMedicines((prevMedicines) =>
      prevMedicines.map((med) =>
        med.id === id ? { ...med, isChecked: !med.isChecked, isEditing: !med.isChecked ? false : med.isEditing } : med
      )
    );
  };

  const handleQuantityChange = (id, quantity) => {
    setMedicines((prevMedicines) =>
      prevMedicines.map((med) =>
        med.id === id ? { ...med, quantity: parseInt(quantity) || null } : med
      )
    );
  };
 
  

  const handleMedicineChange = (id, name) => {
    setMedicines((prevMedicines) =>
      prevMedicines.map((med) =>
        med.id === id ? { ...med, name, isEditing: false } : med
      )
    );
  };

  // const handleSearchChange = (input) => {
  //   setSearchInput(input);
  //   if (input) {
  //     const filteredResults = medicineOptions.filter((medicine) =>
  //       medicine.name.toLowerCase().includes(input.toLowerCase())
  //     );
  //     setSearchResults(filteredResults);
  //   } else {
  //     setSearchResults([]);
  //   }
  // };
  const handleSearchChange = (input) => {
    setSearchInput(input);
    if (input) {
      const filteredResults = medicineOptions.filter((medicine) =>
        medicine.name && medicine.name.toLowerCase().includes(input.toLowerCase()) // Check if medicine.name exists
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };
  

  const handleSelectMedicine = (name, medicineID) => {
    setSearchResults([]);
    setSelectedMedicines({ ...selectedMedicines, [medicineID]: name });
  };

  const handleEditMedicine = (id, name) => {
    const selectedMedicine = medicines.find((med) => med.id === id);
    setSearchInput(selectedMedicine.name);
    setMedicines((prevMedicines) =>
      prevMedicines.map((med) =>
        med.id === id ? { ...med, isEditing: true } : med
      )
    );
  };
  
  const handleSubmit = () => {
    // Filter the medicines where isChecked is true and quantity is greater than 0
    const selectedMedicines = medicines
      .filter((med) => med.isChecked && med.quantity > 0)
      .map((med) => ({ name: med.name, id: med.id, quantity: med.quantity }));
  
    // Log the selected medicines with their name, id, and quantity
    console.log('Selected Medicines:', selectedMedicines);
  };
  

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Prescribed Medicines</h2>
      <ul>
        {medicines.map((med) => (
          <li
            key={med.id}
            className="flex items-center justify-between mb-2 p-2 border-b"
          >
            <div className="flex-1 mr-4">
              {med.type === 'manual' && med.isChecked && med.isEditing ? (
                <>
                  <SearchHeader input={searchInput} handleChange={handleSearchChange} />
                  <SearchResultsList results={searchResults} onItemSelect={(name, id) => handleMedicineChange(med.id, name)} />
                </>
              ) : (
                <span>{med.name}</span>
              )}
            </div>
            <div className="flex items-center gap-4">
            {med.type === 'manual' && med.isChecked && !med.isEditing && (
              <button onClick={() => handleEditMedicine(med.id, med.name)} className="underline">Search Name</button>
              )}
              <input
                type="number"
                min="0"
                value={med.quantity}
                onChange={(e) => handleQuantityChange(med.id, e.target.value)}
                disabled={!med.isChecked}
                className="w-16 p-2 border rounded"
              />
              <label className="flex flex-row items-center gap-2.5 cursor-pointer">
                
                <input
                  type="checkbox"
                  checked={med.isChecked}
                  onChange={() => handleTick(med.id)}
                  className="peer hidden"
                />
                <div className="h-5 w-5 flex rounded-md border border-[#a2a1a833] light:bg-[#e8e8e8] dark:bg-[#212121] peer-checked:bg-backgroundColor transition">
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
          onClick={handleSubmit}
          className="mt-4 px-6 py-2 bg-primaryColor text-white rounded hover:bg-hoverColor"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PrescribedMedicines;
