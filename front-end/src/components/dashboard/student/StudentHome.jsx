import React from "react";
import DUMCimg from "../../../assets/img/StudentDUMC.svg";
const StudentHome = () => {
  return (
    <div>
      <div class="area ">
        <ul class="circles">
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
          <div class="min-h-screen flex flex-col justify-center items-center pb-28">
            <img src={DUMCimg} alt="Logo" class="mb-8 h-40" />
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-700 dark:text-white mb-4">
              DU Medical Centre
            </h1>
            <p class="text-center text-gray-500 dark:text-gray-300 text-lg md:text-xl lg:text-2xl mb-8">
              Excellent health service to students, teachers, and staff of the
              University of Dhaka !
            </p>
            <div class="flex space-x-4">
              <a
                href="#"
                class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Book Appointment
              </a>
              <a
                href="#"
                class="border-2 border-gray-800 text-black font-bold py-3 px-6 rounded dark:text-white dark:border-white"
              >
                Past Record
              </a>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default StudentHome;
