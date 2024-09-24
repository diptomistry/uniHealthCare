import React, { useContext, useState } from "react";
import { UserContext } from "../services/auth/UserProvider";

const PersonalInfo = () => {
  const { user } = useContext(UserContext);
  const {updateUser} = useContext(UserContext);
  

  // State to hold form values
  const [formData, setFormData] = useState({
    name: user?.name || "",
    dob: user?.dob || "",
    phone: user?.phone || "",
    gender: user?.sex || "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Get the token from local storage

      fetch("http://localhost:8000/api/auth/update/9", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          dob: formData.dob,
          phone: formData.phone,
          password: formData.password,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse the response as JSON
        })
        .then((data) => {
          console.log(data); // Handle the parsed JSON data
          if (data.success) {
            alert(data.message);
            updateUser(data.data);
          } else {
            alert("Error: " + data.message);
          }
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto m-5">
      {/* Name Field */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="name"
          id="name"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-backgroundColor focus:outline-none focus:ring-0 focus:border-backgroundColor peer"
          placeholder=" "
          value={formData.name}
          onChange={handleChange}
        />
        <label
          htmlFor="name"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-backgroundColor peer-focus:dark:text-backgroundColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Name
        </label>
      </div>

      {/* Date of Birth Field */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="date"
          name="dob"
          id="dob"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-backgroundColor focus:outline-none focus:ring-0 focus:border-backgroundColor peer"
          placeholder=" "
          value={formData.dob}
          onChange={handleChange}
        />
        <label
          htmlFor="dob"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-backgroundColor peer-focus:dark:text-backgroundColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Date of Birth
        </label>
      </div>

      {/* Phone Field */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="tel"
          name="phone"
          id="phone"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-backgroundColor focus:outline-none focus:ring-0 focus:border-backgroundColor peer"
          placeholder=" "
          value={formData.phone}
          onChange={handleChange}
        />
        <label
          htmlFor="phone"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-backgroundColor peer-focus:dark:text-backgroundColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Phone number
        </label>
      </div>

      {/* Password Field */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          name="password"
          id="password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-backgroundColor focus:outline-none focus:ring-0 focus:border-backgroundColor peer"
          placeholder=" "
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label
          htmlFor="password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-backgroundColor peer-focus:dark:text-backgroundColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Password
        </label>
      </div>

      <button
        type="submit"
        className="text-white bg-primaryColor hover:bg-hoverColor focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm min-w-full sm:w-auto px-5 py-2.5 text-center dark:bg-backgroundColor dark:hover:bg-primaryColor dark:focus:ring-brightColor"
      >
        Submit
      </button>
    </form>
  );
};

export default PersonalInfo;
