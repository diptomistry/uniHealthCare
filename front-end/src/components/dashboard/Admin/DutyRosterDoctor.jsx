// import React,{useState,useEffect} from 'react'
// import DynamicTable from '../../../layouts/dashboard/DynamicTable'
// import { AloSchedule,AloSchedule2,AloSchedule3 } from '../../../assets/dashboard'
// import Button from '../../../layouts/dashboard/DutyRoster/Button'

// const DutyRosterDoctor = () => {

//   return (
//     <div className='flex flex-col gap-5 mb-5'>
//       <DynamicTable AloSchedule={AloSchedule} Title='ডাক্তারদের ডিউটি রোস্টার' />
//       <Button title={'Submit'} />
//       <DynamicTable AloSchedule={AloSchedule2} />
//       <Button title={'Submit'} />
//       <DynamicTable AloSchedule={AloSchedule3} Title='রাত্রিকালীন অতি জরুরি ডিউটি :' />
//       <Button title={'Submit'} />
//     </div>
//   );
// };

// export default DutyRosterDoctor;
import React, { useState, useEffect } from 'react';
import DynamicTable from '../../../layouts/dashboard/DynamicTable';
import { AloSchedule,AloSchedule2,AloSchedule3 } from '../../../assets/dashboard'


const DutyRosterDoctor = () => {
  const [dutyRoster, setDutyRoster] = useState([]);

  useEffect(() => {
    const fetchDutyRoster = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/duty-roster/table', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setDutyRoster(data);
      } catch (error) {
        console.error('Error fetching duty roster:', error);
      }
    };

    fetchDutyRoster();
  }, []);

  const formatRosterForTable = (rosterData) => {
    const headerRow = ["Day"]; // Start with the 'Day' column
    const rows = [];

    // Loop through each day of the week
    rosterData.forEach(day => {
      const dayRow = [day.dayOfWeek]; // First column is the day

      // Loop through the slots of the current day
      day.slots.forEach(slot => {
        // Add slot times as headers if they are not already in the headerRow
        if (!headerRow.includes(slot.slotTime)) {
          headerRow.push(slot.slotTime);
        }

        // Add doctor names to the day row, or 'No doctors' if none exist
        const doctors = slot.doctors.length > 0 ? slot.doctors.map(doctor => doctor.name).join(', ') : 'No doctors';
        dayRow.push(doctors);
      });

      rows.push(dayRow);
    });

    // Sort headerRow by time, assuming it's in the format '2PM-3PM', '3PM-4PM', etc.
    const sortedHeaderRow = headerRow.slice(1).sort((a, b) => {
      const timeA = parseInt(a.split('PM')[0], 10);
      const timeB = parseInt(b.split('PM')[0], 10);
      return timeA - timeB;
    });

    // Combine 'Day' with sorted time slots to form the final header row
    const finalHeaderRow = ['Day', ...sortedHeaderRow];
    
    // Ensure each day's row aligns with the correct time slots
    const alignedRows = rows.map(row => {
      const alignedRow = [row[0]]; // Start with the day of the week
      sortedHeaderRow.forEach(slotTime => {
        const index = headerRow.indexOf(slotTime);
        alignedRow.push(row[index] || 'No doctors'); // Ensure all time slots have a value
      });
      return alignedRow;
    });

    return [finalHeaderRow, ...alignedRows];
  };

  const formattedRoster = formatRosterForTable(dutyRoster);

  return (
    <div className='flex flex-col gap-5 mb-5 '>
      <DynamicTable AloSchedule={formattedRoster} Title='ডাক্তারদের ডিউটি রোস্টার' />

         <DynamicTable AloSchedule={AloSchedule2} />
   
      <DynamicTable AloSchedule={AloSchedule3} Title='রাত্রিকালীন অতি জরুরি ডিউটি :' />
   
    </div>
  );
};

export default DutyRosterDoctor;
