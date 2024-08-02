import React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';

// Custom styles for the modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '600px',
    zIndex: 1000,
    padding: '20px',
  },
  overlay: {
    zIndex: 1000,
  },
};

const CustomModal = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Custom Modal"
    >
      <button
        onClick={onRequestClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 transition duration-300"
      >
        <FaTimes className="text-2xl" />
      </button>
      {children}
    </Modal>
  );
};

export default CustomModal;
