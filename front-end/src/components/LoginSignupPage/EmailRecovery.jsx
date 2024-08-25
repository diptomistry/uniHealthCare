import React, { useState } from "react";
import Button from "../../layouts/homepage/Button";
import EmailRecoveryOTP from "./EmailRecoveryOTP";

const EmailRecovery = ({ closeForm }) => {
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("http://localhost:8000/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          debug: false,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtp(data.otp);
        setShowOTP(true);
      } else {
        setError(data.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      setError("An error occurred while sending the OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="popup-form absolute mt-12 text-black">
        {showOTP ? (
          <EmailRecoveryOTP otp={otp} email={email} />
        ) : (
          <form
            onSubmit={handleSendCode}
            className="w-80 md:w-96 space-y-5 bg-white p-5 rounded-xl"
          >
            <h1 className="text-2xl font-semibold text-center text-backgroundColor">
              Forgot your password?
            </h1>
            <p className="font-light text-gray-500">
              Don't fret! Just type in your email and we will send you a code to
              reset your password!
            </p>
            {error && (
              <p className="text-red-500 text-center">
                {error}
              </p>
            )}
            <div className="flex flex-col">
              <input
                className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
                type="email"
                name="userEmail"
                id="userEmail"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="flex gap-5 justify-between">
              <button
                type="submit"
                className="hover:text-hoverColor transition-all cursor-pointer"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </div>
                ) : (
                  <Button title="Send Code" />
                )}
              </button>
            {!loading ? (
                <button
                type="button"
                className="bg-backgroundColor text-white px-10 rounded-md active:bg-red-500"
                onClick={closeForm}
                disabled={loading}
              >
                Close
              </button>
            ) : null}
           
            </div>
          </form>
        )}

        {showOTP && (
          <div className="absolute top-2 right-2">
            <button onClick={closeForm}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-brightColor hover:text-hoverColor"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailRecovery;