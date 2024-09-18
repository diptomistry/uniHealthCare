import React, { useState } from 'react';

const PrescribedMedicines = ({appointmentID}) => {
  console.log('d',appointmentID);

  const [medicines, setMedicines] = useState([
    { id: 1, name: 'Paracetamol', isChecked: true, quantity: 10, type: 'search' },
    { id: 2, name: 'Amoxicillin', isChecked: true, quantity: 10, type: 'search' },
    { id: 3, name: 'Ibuprofen', isChecked: false, quantity: 7, type: 'manual' },
    { id: 4, name: 'Vitamin C', isChecked: false, quantity: 7, type: 'manual' },
  ]);

  const handleTick = (id) => {
    setMedicines((prevMedicines) =>
      prevMedicines.map((med) =>
        med.id === id ? { ...med, isChecked: !med.isChecked } : med
      )
    );
  };

  const handleQuantityChange = (id, quantity) => {
    setMedicines((prevMedicines) =>
      prevMedicines.map((med) =>
        med.id === id ? { ...med, quantity: parseInt(quantity) || 0 } : med
      )
    );
  };

  const handleSubmit = () => {
    const selectedMedicines = medicines.filter((med) => med.isChecked && med.quantity > 0);
    console.log('Selected Medicines:', selectedMedicines);
    // Implement further submit logic here
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
            <span>{med.name}</span>
            <div className="flex items-center gap-4">
              <input
                type="number"
                min="0"
                value={med.quantity}
                onChange={(e) => handleQuantityChange(med.id, e.target.value)}
                disabled={!med.isChecked}
                className="w-16 p-2 border rounded"
              />
              <label
                className="flex flex-row items-center gap-2.5 dark:text-white light:text-black cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={med.isChecked}
                  onChange={() => handleTick(med.id)}
                  className="peer hidden"
                />
                <div
                  className="h-5 w-5 flex rounded-md border border-[#a2a1a833] light:bg-[#e8e8e8] dark:bg-[#212121] peer-checked:bg-backgroundColor transition"
                >
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 stroke-[#e8e8e8] dark:stroke-[#212121]"
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
      <div className='flex justify-end'>
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
