import React, { useState, useEffect, useRef } from 'react';

const UserFilter = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const categories = [
    { id: 'student', label: 'Student', count: 56 },
    { id: 'doctor', label: 'Doctor', count: 56 },
    { id: 'sectionOfficer', label: 'Section Officer', count: 56 },
    { id: 'dispensaryOfficer', label: 'Dispensary Officer', count: 97 },
    { id: 'nurse', label: 'Nurse', count: 97 },
    { id: 'teacher', label: 'Teacher', count: 97 },
    { id: 'staff', label: 'Staff', count: 176 },
  ];

  return (
    <div className="flex items-center justify-center ml-2 mb-1">
      <div className="relative" ref={dropdownRef}>
        <button
          id="dropdownDefault"
          onClick={toggleDropdown}
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
          className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
          type="button"
        >
          Filter by category
          <svg
            className="w-4 h-4 ml-2"
            aria-hidden="true"
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
            ></path>
          </svg>
        </button>

        {isDropdownOpen && (
          <div
            id="dropdown"
            className="absolute z-10 w-56 p-3 mt-2 bg-white rounded-lg shadow dark:bg-gray-700"
          >
            <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
              Category
            </h6>
            <ul className="space-y-2 text-sm">
              {categories.map((category) => (
                <li key={category.id} className="flex items-center">
                  <input
                    id={category.id}
                    type="checkbox"
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded  dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor={category.id}
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    {category.label} ({category.count})
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserFilter;
