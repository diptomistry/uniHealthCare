import React from 'react';
import CustomModal from './CustomModal';
import { IoIosWarning } from "react-icons/io";


const DeleteConfirmationModal = ({ isOpen, onRequestClose, itemName, onConfirmDelete }) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ChildrenStyle="flex flex-col items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Delete Confirmation</h2>
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 flex items-center" role="alert">
       <IoIosWarning className="text-2xl mr-2 text-yellow-500" />
        <p>Are you sure you want to delete '{itemName}'?</p>
      </div>
      <div className="flex justify-end w-full">
        <button
          onClick={onRequestClose}
          className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-300"
        >
          Cancel
        </button>
        <button
          onClick={onConfirmDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
        >
          Delete
        </button>
      </div>
    </CustomModal>
  );
};

export default DeleteConfirmationModal;
