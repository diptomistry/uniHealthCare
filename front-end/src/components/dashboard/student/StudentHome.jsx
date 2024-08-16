import React, { useState } from "react";
import DUMCimg from "../../../assets/img/StudentDUMC.svg";
import CustomModal from "../../../models/CustomModal";

const StudentHome = () => {
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
      <div className="area ">
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
          <div className="min-h-screen flex flex-col justify-center items-center pb-28">
            <img src={DUMCimg} alt="Logo" className="mb-8 h-40" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-700 dark:text-white mb-4">
              DU Medical Centre
            </h1>
            <p className="text-center text-gray-500 dark:text-gray-300 text-lg md:text-xl lg:text-2xl mb-8">
              Excellent health service to students, teachers, and staff of the
              University of Dhaka!
            </p>
            <div className="flex space-x-4">
              <button
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded dark:bg-gray-700 dark:hover:bg-gray-600"
                onClick={() => handleButtonClick("Book Appointment")}
              >
                Book Appointment
              </button>
              <button
                className="border-2 border-gray-800 text-black font-bold py-3 px-6 rounded dark:text-white dark:border-white hover:bg-gray-300"
                onClick={() => handleButtonClick("Past Record")}
              >
                Past Record
              </button>
            </div>
          </div>
        </ul>
      </div>
      <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <div className="p-4">
          <h2 className="text-xl font-bold">{modalContent}</h2>
          {/* Conditionally rendering modal content */}
          {modalContent === "Book Appointment" && (
            <div>
              <p className="mb-4">
                Please describe the problem you are facing. Select a convenient date and time to confirm your appointment with the DU Medical Centre.
              </p>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700">Describe the Problem</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="4"
                    placeholder="Describe your symptoms or the issue..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-gray-700">Select Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Select Time</label>
                  <input
                    type="time"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primaryColor hover:bg-hoverColor text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Confirm Appointment
                </button>
              </form>
            </div>
          )}
          {modalContent === "Past Record" && (
            <p>No Past Records Avaiable.</p>
          )}
        </div>
      </CustomModal>
    </div>
  );
};

export default StudentHome;
