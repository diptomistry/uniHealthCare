import React from "react";
import Button from "../../layouts/homepage/Button";
import MapComponent from "./MapComponent";

const Contact = ({ closeForm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className=" absolute mt-12 text-black">
        <form className="w-80 md:w-96 space-y-5 bg-white p-5 rounded-xl">
          <h1 className="text-4xl font-semibold text-center text-backgroundColor">
            Contact Info.
          </h1>
          <div>
            Dhaka 1000, Bangladesh
            <br />
            Near the Science Annex Building
            <br />
            cmo.dumc@gmail.com
            <br />
            +88 09666 911 463 (Ext.)
          </div>
          <MapComponent />
          <div className="flex gap-5">
            <Button title="Book Appointment" />
            <button
              type="button"
              className="bg-gray-600 text-white px-10 rounded-md hover:bg-red-400 active:bg-red-500"
              onClick={closeForm}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
