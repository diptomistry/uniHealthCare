import React, { useState } from 'react';
import AddressAutocomplete from './AddressAutocomplete';

const Signup = ({ userType, handleUserTypeChange }) => {
  const [address, setAddress] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [signature, setSignature] = useState(null);

  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress);
  };

  const handleSignatureChange = (event) => {
    setSignature(event.target.files[0]);
  };

  return (
    <form action="#">
      <div className="flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-2xl xl:text-4xl font-extrabold text-textColor">
            Authority Sign up
          </h1>
          <p className="text-[12px] text-gray-500">
            Enter your details to create your account
          </p>
        </div>

        <div className="w-full flex-1 mt-8">
          <div className="mx-auto max-w-xs flex flex-col gap-4">
            <select
              id="user_type"
              className="bg-[#d5f2ec] border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={userType}
              onChange={handleUserTypeChange}
            >
              <option value="at">Account Type</option>
              <option value="doctor">Doctor</option>
              <option value="student">Student</option>
              <option value={"teacher"}>Teacher</option>
              <option value="admin">Admin</option>
              <option value="dispensaryOfficer">Dispensary Officer</option>
              <option value="sectionOfficer">Section Officer</option>
              <option value="seniorOfficer">Senior Officer</option>
              <option value="staff">Staff</option>
            </select>

            {userType !== "student" && (
              <input
                className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
                type="text"
                placeholder="Enter your name"
              />
            )}
            {userType === "student" && (
              <div className="flex gap-2">
                <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-1/2"
                  type="text"
                  placeholder="Your name"
                />
                <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-1/2"
                  type="text"
                  placeholder="Dept name"
                />
              </div>
            )}

            {(userType === "doctor" || userType === "student") && (
              <div className="flex gap-2">
                <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-1/2"
                  type="email"
                  placeholder="Enter your email"
                />
                <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-1/2"
                  type="tel"
                  placeholder="Enter your phone"
                />
              </div>
            )}

            {userType !== "doctor" && userType !== "student" && (
              <>
                <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
                  type="email"
                  placeholder="Enter your email"
                />
                <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
                  type="tel"
                  placeholder="Enter your phone"
                />
              </>
            )}

            <AddressAutocomplete onAddressSelect={handleAddressSelect} />

            {userType === "doctor" && (
              <select
                id="department"
                className="bg-[#d5f2ec] text-gray-500 py-3 px-2 rounded-lg w-full"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">Department</option>
                <option value="medicine">Medicine</option>
                <option value="surgery">Surgery</option>
                <option value="gynae">Gynae</option>
                <option value="orthopedic">Orthopedic</option>
              </select>
            )}
            {userType === "student" && (
              <div className="flex gap-2">
                <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-1/2"
                  type="number"
                  placeholder="Reg. Number"
                />
                <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-1/2"
                  type="text"
                  placeholder="Session"
                />
              </div>
            )}

            <div className="flex gap-2">
              <input
                className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-1/2"
                type="text"
                onFocus={(e) => (e.currentTarget.type = "date")}
                onBlur={(e) => (e.currentTarget.type = "text")}
                placeholder="DOB"
              />
              <select
                id="gender"
                className="bg-[#d5f2ec] text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5"
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div className="flex gap-2">
              <input
                className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-1/2"
                type="password"
                placeholder="Password"
              />
              <input
                className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-1/2"
                type="password"
                placeholder="Confirm Pass..."
              />
            </div>


            {userType !== "student" && userType !== "teacher" && userType !== "staff" && userType !== "at" && (
              <div>
                <label className="text-gray-500 text-sm">Upload Signature:</label>
                <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-full"
                  type="file"
                  onChange={handleSignatureChange}
                />
              </div>
            )}

            <button
              className="mt-4 tracking-wide font-semibold bg-brightColor text-gray-100 w-full py-4 rounded-lg hover:bg-hoverColor transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              <svg
                className="w-6 h-6 -ml-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <path d="M20 8v6M23 11h-6" />
              </svg>
              <span className="ml-3">Sign Up</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Signup;
