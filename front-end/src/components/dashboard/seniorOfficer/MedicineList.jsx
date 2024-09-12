import React, { useState } from 'react';
import { FaEdit, FaSave } from 'react-icons/fa';

const medicines = [
  {
    id: 1,
    name: "Aspirin",
    quantity: 100
  },
  {
    id: 2,
    name: "Ibuprofen",
    quantity: 50
  },
  {
    id: 3,
    name: "Paracetamol",
    quantity: 75
  },
  {
    id: 4,
    name: "Aspirin",
    quantity: 100
  },
  {
    id: 5,
    name: "Ibuprofen",
    quantity: 50
  },
  {
    id: 6,
    name: "Paracetamol",
    quantity: 75
  }
];

const MedicineCard = ({ medicine, onQuantityChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [quantity, setQuantity] = useState(medicine.quantity);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const handleSave = () => {
    onQuantityChange(medicine.id, quantity);
    setIsEditing(false);
  };

  const handleReject = () => {
    console.log(`Medicine ${medicine.name} rejected.`);
    // Implement reject logic here
  };

  const handleAccept = () => {
    console.log(`Medicine ${medicine.name} accepted.`);
    // Implement accept logic here
  };

  return (
    <div className="p-4 pl-12 pr-12 md:pl=24 md:pr-24 bg-white shadow-md rounded-md flex items-center justify-between">
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-800">{medicine.name}</h3>
        <div className="mt-2 text-gray-600">
          <span className="font-medium">Quantity:</span>
          {isEditing ? (
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className="ml-2 border border-gray-300 rounded p-1 w-20"
            />
          ) : (
            <span className="ml-2">{quantity}</span>
          )}
        </div>
      </div>
      <div className="ml-4 flex items-center">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="text-brightColor hover:text-hoverColor mr-2"
          >
            <FaSave />
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-brightColor mr-2"
          >
            <FaEdit />
          </button>
        )}
        <button
          onClick={handleAccept}
          className="bg-primaryColor text-white py-1 px-2 rounded hover:bg-hoverColor mr-2"
        >
          Accept
        </button>
        <button
          onClick={handleReject}
          className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

const MedicineList = () => {
  const [medicineList, setMedicineList] = useState(medicines);

  const handleQuantityChange = (id, newQuantity) => {
    setMedicineList(prevList =>
      prevList.map(medicine =>
        medicine.id === id ? { ...medicine, quantity: newQuantity } : medicine
      )
    );
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {medicineList.map((medicine) => (
        <MedicineCard
          key={medicine.id}
          medicine={medicine}
          onQuantityChange={handleQuantityChange}
        />
      ))}
    </div>
  );
};

export default MedicineList;
