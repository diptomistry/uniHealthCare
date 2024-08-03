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
    maxWidth: '800px',
    maxHeight: '90vh',
    zIndex: 1000,
    padding: '20px',
    position: 'relative',
  },
  overlay: {
    zIndex: 1000,
  },
};

const CustomModal = ({ isOpen, onRequestClose, children,ChildrenStyle }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Custom Modal"
    >
      <button
        onClick={onRequestClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 transition duration-300 z-50"
      >
        <FaTimes className="text-2xl" />
      </button>
      <div className={`max-h-[80vh] ${ChildrenStyle}`} > {/* Added margin to the top */}
        {children}
      </div>
    </Modal>
  );
};

export default CustomModal;
