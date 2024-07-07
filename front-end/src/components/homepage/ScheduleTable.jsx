import React from 'react';

const dummyScheduleData = [
  {
    doctors: ['Dr. John Doe', 'Dr. Jane Smith'],
    designation: ['Cardiologist', 'Neurologist'],
    day: 'Monday, Wednesday',
    times: ['9:00 AM - 1:00 PM', '2:00 PM - 6:00 PM']
  },
  {
    doctors: ['Dr. Emily Brown'],
    designation: ['Pediatrician'],
    day: 'Tuesday, Thursday',
    times: ['10:00 AM - 3:00 PM']
  },
  {
    doctors: ['Dr. Michael Johnson', 'Dr. Sarah Lee'],
    designation: ['Orthopedic Surgeon', 'Dermatologist'],
    day: 'Friday',
    times: ['8:00 AM - 12:00 PM', '1:00 PM - 5:00 PM']
  }
];

const ScheduleTable = () => {
  return (
    <div className="min-h-screen  lg:px-32 px-5 pt-16 bg-white p-6 rounded-lg shadow-md place-content-center" >
      <h2 className="text-2xl font-bold text-textColor mb-4">MEDICAL CENTER SCHEDULE</h2>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full border border-brightColor rounded-lg">
                <thead className="bg-backgroundColor/30 text-white">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left">
                      DOCTOR'S NAME
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                      DESIGNATION
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                      SCHEDULE
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                      TIME
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dummyScheduleData.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-backgroundColor/10' : 'bg-blue-100'}>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-pre-wrap">{item.doctors.join('\n')}</td>
                      <td className="px-6 py-4 text-gray-800 whitespace-pre-wrap">{item.designation.join('\n')}</td>
                      <td className="px-6 py-4 text-gray-800 whitespace-nowrap">{item.day}</td>
                      <td className="px-6 py-4 text-gray-800 whitespace-pre-wrap">{item.times.join('\n')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-green-800">For inquiries, please call +88 09666 911 463 (Ext. )</p>
    </div>
  );
};

export default ScheduleTable;