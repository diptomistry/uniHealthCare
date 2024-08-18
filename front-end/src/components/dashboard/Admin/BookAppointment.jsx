import React, { useState } from "react";
import CustomModal from "../../../models/CustomModal";
import BookingInfo from "../../../layouts/dashboard/Bookinginfo";
import AppointmentModalData from "../../../models/dashboard/AppointModalData";

const BookAppointment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  return (
    <div>
      <div className="area shadow-lg rounded-2xl">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <BookingInfo handleButtonClick={handleButtonClick} />
        </ul>
      </div>
      <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <AppointmentModalData modalContent={modalContent} />
      </CustomModal>
    </div>
  );
};

export default BookAppointment;
