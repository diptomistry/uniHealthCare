import React, { useState } from "react";

const ChangePassword = ({ email }) => {
  //console.log('newemail',email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      console.log('bb',email);
      const response = await fetch("http://localhost:8000/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email, // Pass the email from props
          current_pass: password,
          confirm_pass: confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Password changed successfully!");
      } else {
        setError(data.message || "Failed to change password. Please try again.");
      }
    } catch (error) {
      setError("An error occurred while changing the password. Please try again.");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="w-full p-10 bg-white rounded-lg shadow md:mt-0 sm:max-w-md">
        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Change Password
        </h2>
        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handlePasswordChange}>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
              New Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="••••••••"
              className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-brightColor hover:bg-hoverColor focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
