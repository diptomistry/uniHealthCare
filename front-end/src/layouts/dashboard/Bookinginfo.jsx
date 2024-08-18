import React from 'react';
import DUMCimg from "../../assets/img/StudentDUMC.svg";

const BookingInfo = ({ handleButtonClick }) => {
  return (
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
  );
};

export default BookingInfo;
