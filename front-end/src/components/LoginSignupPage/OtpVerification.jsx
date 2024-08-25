import React, { useState } from "react";
import axios from "axios";

const OtpVerification = ({ email, onVerifySuccess, onClose }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const sendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/auth/send-otp", {
        email,
        debug: false,
      });
      setOtpSent(true);
      console.log(response.data.message);
      alert("OTP sent successfully!");
    } catch (error) {
      setError("Failed to send OTP. Please try again.");
      console.error(error.response?.data || error.message);
    }
  };

  const verifyOtp = async () => {
    // Replace this with your actual OTP verification logic
    if (otp === "5890") {
      alert("OTP verified successfully!");
      onVerifySuccess();
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div>
      {!otpSent ? (
        <div>
          <p className="text-gray-500">We need to verify your email before proceeding.</p>
          <button onClick={sendOtp} className="mt-4 tracking-wide font-semibold bg-brightColor text-gray-100 w-full py-4 rounded-lg hover:bg-hoverColor transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
            Send OTP
          </button>
        </div>
      ) : (
        <div>
          <p className="text-gray-500">Enter the OTP sent to {email}</p>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-full mt-2"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-between mt-4">
            <button
              onClick={verifyOtp}
              className="tracking-wide font-semibold bg-brightColor text-gray-100 w-full py-4 rounded-lg hover:bg-hoverColor transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              Verify OTP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OtpVerification;
