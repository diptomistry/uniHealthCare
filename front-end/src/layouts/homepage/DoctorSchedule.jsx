import React,{useState,useEffect} from 'react';
import { AloSchedule,AloSchedule2,AloSchedule3 } from '../../assets/dashboard';
const DoctorScheduleTable = () => {

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
       
        console.error('Error fetching duty roster..:', error);
        console.error('Details:', error.message);
      }
    };

    fetchDutyRoster();
  }, []);
  const parseTimeRange = (timeRange) => {
    const convertTo24Hour = (time) => {
      const [hour, period] = time.match(/\d+|AM|PM/g);
      let hourIn24 = parseInt(hour, 10);
      
      if (period === 'PM' && hourIn24 !== 12) {
        hourIn24 += 12;
      } else if (period === 'AM' && hourIn24 === 12) {
        hourIn24 = 0;
      }
      
      return hourIn24;
    };
  
    const [start, end] = timeRange.split('-').map(time => time.trim());
    const startHour = convertTo24Hour(start);
    const endHour = convertTo24Hour(end);
    return { startHour, endHour };
  };
  
  
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
  
        // If no doctors are present, include slot time and id
        const doctors = slot.doctors.length > 0 
          ? slot.doctors.map(doctor => {
              return `${doctor.name} (${doctor.specialization})`;
            }).join(', ')
          : `  `;
  
        dayRow.push(doctors); // Push the doctors or slot info if no doctors
      });
  
      rows.push(dayRow);
    });
  const sortedHeaderRow = headerRow.slice(1).sort((a, b) => {
    const { startHour: startHourA, endHour: endHourA } = parseTimeRange(a);
    const { startHour: startHourB, endHour: endHourB } = parseTimeRange(b);

    if (startHourA !== startHourB) return startHourA - startHourB;
    return endHourA - endHourB;
  });
  
    // Combine 'Day' with sorted time slots to form the final header row
    const finalHeaderRow = ['Day', ...sortedHeaderRow];
  
    // Ensure each day's row aligns with the correct time slots
    const alignedRows = rows.map(row => {
      const alignedRow = [row[0]]; // Start with the day of the week
      sortedHeaderRow.forEach(slotTime => {
        const index = headerRow.indexOf(slotTime);
        alignedRow.push(row[index] || `Slot ID: -, Time: ${slotTime}`); // Push empty slot ID and time if no data
      });
      return alignedRow;
    });
  
    return [finalHeaderRow, ...alignedRows];
  };
  const formattedRoster = formatRosterForTable(dutyRoster);
  const getGridTemplateColumns = (schedule) => `repeat(${schedule[0].length}, 1fr)`;

  return (
    <div className='flex flex-col gap-5 '>
      <div className='flex flex-col md:flex-row justify-center'>
        <div>
          <h2 className="text-sm md:text-2xl font-hindSiliguri text-textColor">ডাক্তারদের ডিউটি রোস্টার </h2>
        </div>
        
      </div>

      <div className="grid " style={{ gridTemplateColumns: getGridTemplateColumns(formattedRoster) }}>
        {formattedRoster.map((row, rowIndex) => (
          row.map((cell, cellIndex) => (
            <div 
              key={`${rowIndex}-${cellIndex}`} 
              className={`p-2 border border-gray-300  ${rowIndex === 0 ? 'font-bold bg-gray-100' : ''}`}
            >
              {cell}
            </div>
          ))
        ))}
      </div>

    
    </div>
  );
};

export default DoctorScheduleTable;
