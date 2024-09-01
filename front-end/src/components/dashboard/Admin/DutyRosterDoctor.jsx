import React,{useState,useEffect} from 'react'
import DynamicTable from '../../../layouts/dashboard/DynamicTable'
import { AloSchedule,AloSchedule2,AloSchedule3 } from '../../../assets/dashboard'
import Button from '../../../layouts/dashboard/DutyRoster/Button'

const DutyRosterDoctor = () => {
  const [aloSchedule, setAloSchedule] = useState([]);
 

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/roster/slots-by-week', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        // Transform data to fit the DynamicTable format
        const transformData = data.map(day => [
          day.name, // Day name (e.g., "Monday")
          ...day.slots.map(slot => slot.timeSlot + ': ' + slot.doctors.map(doc => doc.user.name).join(', '))
        ]);
        console.log(transformData);
        // Set the transformed data for each schedule (for simplicity, we'll use the same data for all)
        setAloSchedule(transformData);
       

      } catch (error) {
        console.error('Error fetching roster data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='flex flex-col gap-5 mb-5'>
      <DynamicTable AloSchedule={AloSchedule} Title='ডাক্তারদের ডিউটি রোস্টার' />
      <Button title={'Submit'} />
      <DynamicTable AloSchedule={AloSchedule2} />
      <Button title={'Submit'} />
      <DynamicTable AloSchedule={AloSchedule3} Title='রাত্রিকালীন অতি জরুরি ডিউটি :' />
      <Button title={'Submit'} />
    </div>
  );
};

export default DutyRosterDoctor;
