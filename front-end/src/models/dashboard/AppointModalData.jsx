import React from 'react'

const AppointmentModalData = ({ modalContent }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{modalContent}</h2>
      {modalContent === "Book Appointment" && (
        <div>
          <p className="mb-4">
            Please describe the problem you are facing. Select a convenient date and time to confirm your appointment with the DU Medical Centre.
          </p>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Describe the Problem</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                rows="4"
                placeholder="Describe your symptoms or the issue..."
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700">Select Date</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Select Time</label>
              <input
                type="time"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-primaryColor hover:bg-hoverColor text-white font-bold py-2 px-4 rounded mt-4"
            >
              Confirm Appointment
            </button>
          </form>
        </div>
      )}
      {modalContent === "Past Record" && (
        <p>No Past Records Available.</p>
      )}
    </div>
  )
}

export default AppointmentModalData