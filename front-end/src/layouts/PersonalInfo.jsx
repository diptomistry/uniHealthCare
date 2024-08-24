import React from 'react'

const PersonalInfo = () => {
  return (
    <form className="max-w-md mx-auto m-5">
    <div className="relative z-0 w-full mb-5 group">
      <input
        type="email"
        name="floating_email"
        id="floating_email"
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-backgroundColor focus:outline-none focus:ring-0 focus:border-backgroundColor peer"
        placeholder=" "
        required
      />
      <label
        htmlFor="floating_email"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-backgroundColor peer-focus:dark:text-backgroundColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        Email address
      </label>
    </div>

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

    <div className="relative z-0 w-full mb-5 group">
      <input
        type="password"
        name="repeat_password"
        id="floating_repeat_password"
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-backgroundColor focus:outline-none focus:ring-0 focus:border-backgroundColor peer"
        placeholder=" "
        required
      />
      <label
        htmlFor="floating_repeat_password"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-backgroundColor peer-focus:dark:text-backgroundColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        Confirm password
      </label>
    </div>

    <div className="grid md:grid-cols-2 md:gap-6">
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="floating_first_name"
          id="floating_first_name"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-backgroundColor focus:outline-none focus:ring-0 focus:border-backgroundColor peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_first_name"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-backgroundColor peer-focus:dark:text-backgroundColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          First name
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="floating_last_name"
          id="floating_last_name"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-backgroundColor focus:outline-none focus:ring-0 focus:border-backgroundColor peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_last_name"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-backgroundColor peer-focus:dark:text-backgroundColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Last name
        </label>
      </div>
    </div>

    <div className="grid md:grid-cols-2 md:gap-6">
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          name="floating_phone"
          id="floating_phone"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-backgroundColor focus:outline-none focus:ring-0 focus:border-backgroundColor peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_phone"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-backgroundColor peer-focus:dark:text-backgroundColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Phone number (123-456-7890)
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="floating_company"
          id="floating_company"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-backgroundColor focus:outline-none focus:ring-0 focus:border-backgroundColor peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_company"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-backgroundColor peer-focus:dark:text-backgroundColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Company (Ex. Google)
        </label>
      </div>
    </div>

    <button
      type="submit"
      className="text-white bg-primaryColor hover:bg-hoverColor focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm min-w-full sm:w-auto px-5 py-2.5 text-center dark:bg-backgroundColor dark:hover:bg-primaryColor dark:focus:ring-brightColor "
    >
      Submit
    </button>
  </form>
  )
}

export default PersonalInfo