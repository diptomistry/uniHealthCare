import React, { useContext } from 'react';
import { UserContext } from '../services/auth/UserProvider';

const PersonalInfo = () => {
  const { user } = useContext(UserContext);
  
  // Assuming user object has the necessary fields
  const userInfo = {
    email: user?.email || '',
    name: user?.name || '',
    dob: user?.dob || '',
    phone: user?.phone || '',
    gender: user?.sex || '',
  };

  return (
    <form className="max-w-md mx-auto m-5">
   

      {/* Name Field */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="floating_name"
          id="floating_name"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-backgroundColor focus:outline-none focus:ring-0 focus:border-backgroundColor peer"
          placeholder=" "
          value={userInfo.name} // Pre-fill with user name
          readOnly
        />
        <label
          htmlFor="floating_name"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-backgroundColor peer-focus:dark:text-backgroundColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Name
        </label>
      </div>

      {/* Date of Birth Field */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="date"
          name="floating_dob"
          id="floating_dob"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-backgroundColor focus:outline-none focus:ring-0 focus:border-backgroundColor peer"
          placeholder=" "
          value={userInfo.dob} // Pre-fill with user date of birth
          readOnly
        />
        <label
          htmlFor="floating_dob"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-backgroundColor peer-focus:dark:text-backgroundColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Date of Birth
        </label>
      </div>

      {/* Phone Field */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="tel"
          name="floating_phone"
          id="floating_phone"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-backgroundColor focus:outline-none focus:ring-0 focus:border-backgroundColor peer"
          placeholder=" "
          value={userInfo.phone} // Pre-fill with user phone
          readOnly
        />
        <label
          htmlFor="floating_phone"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-backgroundColor peer-focus:dark:text-backgroundColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Phone number
        </label>
      </div>

      {/* Gender Field */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="floating_gender"
          id="floating_gender"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-backgroundColor focus:outline-none focus:ring-0 focus:border-backgroundColor peer"
          placeholder=" "
          value={userInfo.gender} // Pre-fill with user gender
          readOnly
        />
        <label
          htmlFor="floating_gender"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-backgroundColor peer-focus:dark:text-backgroundColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Gender
        </label>
      </div>

      {/* Password Field */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          name="floating_password"
          id="floating_password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-backgroundColor focus:outline-none focus:ring-0 focus:border-backgroundColor peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_password"
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
