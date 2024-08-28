import React, { useState, useEffect } from "react";
import AddressAutocomplete from "./AddressAutocomplete";
import axios from "axios";
import CustomModal from "../../models/CustomModal";
const Signup = ({ userType, handleUserTypeChange, setIsLoading }) => {
  const [address, setAddress] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [signature, setSignature] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [session, setSession] = useState("");
  const [otp, setOtp] = useState(""); // State to hold the OTP
  const [verifyotp, setVerifyOtp] = useState(null); // State to hold the OTP
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false); // State to manage OTP modal visibility
  const [timer, setTimer] = useState(30);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  //const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsButtonDisabled(true);
    }
    return () => clearInterval(interval);
  }, [timer]);
  useEffect(() => {
    if (isOtpVerified) {
      const timeout = setTimeout(() => {
        setIsOtpModalOpen(false);
        setIsOtpVerified(false); // Reset the OTP verification state
        setOtp(""); // Clear the OTP input field
      }, 2000); // Close the modal after 2 seconds

      return () => clearTimeout(timeout);
    }
  }, [isOtpVerified]);
  // Function to send OTP to user's email
  const sendOtp = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/send-otp",
        {
          email,
          debug: false,
        }
      );

      if (response.data.success) {
        setTimer(30); // Reset the timer
        alert("OTP sent successfully");
        setVerifyOtp(response.data.otp); // Save the expected OTP in state
        setIsOtpModalOpen(true); // Open OTP modal
      }
    } catch (error) {
      console.error(
        "Error sending OTP:",
        error.response?.data || error.message
      );
      alert("Error sending OTP");
    } finally {
      setIsLoading(false); // Hide loading animation
    }
  };
  // Function to handle OTP submission and verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    console.log("Verifying OTP:", otp);
    console.log("Expected OTP:", verifyotp);
    //convert verifyotp to string
    console.log("Expected OTP:", verifyotp.toString());
    // Here you would verify the OTP with the backend, then proceed with the signup if OTP is valid
    if (otp === verifyotp.toString()) {
      // Replace this with actual OTP verification logic
      setIsOtpVerified(true);
      handleSubmit(); // Proceed with the actual user creation
    } else {
      alert("Invalid OTP");
    }
  };
  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress);
  };

  const handleSignatureChange = (event) => {
    setSignature(event.target.files[0]);
  };
  const handleSubmit = async (e) => {
    // Create a JSON object to send as the POST request body to the backend
    const data = {
      name,
      email,
      phone,
      dob,
      gender: selectedGender,
      userType,
      password,
      confirmPass,
      address,
      registeredFrom: "web",
    };

    if (userType === "student") {
      data.departmentId = 1; ///
      data.session = session;
      data.registrationNo = registrationNo;
    }

    if (userType === "doctor") {
      data.departmentId = 3;
      // Assuming the signature is required to be converted to base64 string
      // You can use libraries like FileReader to convert it before sending
    }

    try {
      console.log("Sending data:", data);
      const response = await axios.post(
        "http://localhost:8000/api/auth/create-user",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert(response.data.message);
      setAddress("");
      setSelectedDepartment("");
      setSelectedGender("");
      setSignature(null);
      setName("");
      setEmail("");
      setPhone("");
      setDob("");
      setPassword("");
      setConfirmPass("");
      setRegistrationNo("");
      setSession("");
      // Handle response
      console.log("User created successfully:", response.data);
    } catch (error) {
      alert("Error creating user:");
      // Handle error
      console.error(
        "Error creating user:",
        error.response?.data || error.message
      );
    }
  };
  return (
    <form onSubmit={(e) => e.preventDefault()}>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
            {userType === "student" && (
              <div className="flex gap-2">
                <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-1/2"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-1/2"
                  type="text"
                  placeholder="Dept name"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  required
                />
              </div>
            )}

            {(userType === "doctor" || userType === "student") && (
              <div className="flex gap-2">
                <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-1/2"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-1/2"
                  type="tel"
                  placeholder="Enter your phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            )}

            {userType !== "doctor" && userType !== "student" && (
              <>
                <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
                  type="tel"
                  placeholder="Enter your phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
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
                  value={registrationNo}
                  onChange={(e) => setRegistrationNo(e.target.value)}
                  required
                />
                <input
                  className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-1/2"
                  type="text"
                  placeholder="Session"
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                  required
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
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-1/2"
                type="password"
                placeholder="Confirm Pass..."
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                required
              />
            </div>

            {userType !== "student" &&
              userType !== "teacher" &&
              userType !== "staff" &&
              userType !== "at" && (
                <div>
                  <label className="text-gray-500 text-sm">
                    Upload Signature:
                  </label>
                  <input
                    className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-full"
                    type="file"
                    onChange={handleSignatureChange}
                    required
                  />
                </div>
              )}

            <button
              onClick={sendOtp}
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
      <CustomModal
        isOpen={isOtpModalOpen}
        onRequestClose={() => setIsOtpModalOpen(false)}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">OTP Verification</h2>
          <form onSubmit={handleOtpSubmit}>
            <input
              type="text"
              className="border p-2 rounded mb-4 w-full"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Verify OTP
            </button>
          </form>
          {timer > 0 ? (
            <p className="text-gray-600 mt-4">
              OTP will expire in {timer} seconds
            </p>
          ) : (
            <p className="text-red-500 mt-4">OTP expired. Please try again.</p>
          )}
        </div>
      </CustomModal>
    </form>
  );
};

export default Signup;
