import React, { useState, useEffect, useRef } from 'react';
import { BsCalendar2Range } from "react-icons/bs";

const ReportDateRange = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('All Time');
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left z-[10000]" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
      >
        <BsCalendar2Range className="mr-2" />
        <span>{selectedOption}</span>
        <svg
          className="ml-2 h-5 w-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <div className="py-1">
            <button
              className={`${
                selectedOption === 'Last 30 Days' ? 'text-primaryColor bg-gray-100' : 'text-gray-700'
              } block px-4 py-2 text-sm w-full text-left`}
              onClick={() => handleOptionClick('Last 30 Days')}
            >
              Last 30 Days
            </button>
            <button
              className={`${
                selectedOption === 'Last 6 Months' ? 'text-primaryColor bg-gray-100' : 'text-gray-700'
              } block px-4 py-2 text-sm w-full text-left`}
              onClick={() => handleOptionClick('Last 6 Months')}
            >
              Last 6 Months
            </button>
            <button
              className={`${
                selectedOption === 'Last 1 Year' ? 'text-primaryColor bg-gray-100' : 'text-gray-700'
              } block px-4 py-2 text-sm w-full text-left`}
              onClick={() => handleOptionClick('Last 1 Year')}
            >
              Last 1 Year
            </button>
            <button
              className={`${
                selectedOption === 'All Time Report' ? 'text-primaryColor bg-gray-100' : 'text-gray-700'
              } block px-4 py-2 text-sm w-full text-left`}
              onClick={() => handleOptionClick('All Time Report')}
            >
              All Time
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportDateRange;
