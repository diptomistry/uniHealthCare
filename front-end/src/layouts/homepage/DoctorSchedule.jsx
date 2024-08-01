import React from 'react';
import { AloSchedule,AloSchedule2,AloSchedule3 } from '../../assets/dashboard';
const DoctorScheduleTable = () => {


  const getGridTemplateColumns = (schedule) => `repeat(${schedule[0].length}, 1fr)`;

  return (
    <div className='flex flex-col gap-5 '>
      <div className='flex flex-row justify-between'>
        <div>
          <h2 className="text-sm md:text-2xl font-hindSiliguri text-textColor">ডাক্তারদের ডিউটি রোস্টার </h2>
        </div>
        <div className='flex flex-row gap-2'>
          <div className='flex gap-2'>
            <h2 className="text-sm md:text-xl font-bold text-primaryColor">৯ই জুলাই ২০২৪ </h2>
            <h2 className="text-sm md:text-xl font-bold text-textColor">তারিখ থেকে </h2>
          </div>
          <div className='flex gap-2'>
            <h2 className="text-sm md:text-xl font-bold text-primaryColor"> ১০ই জুলাই ২০২৪</h2>
            <h2 className="text-sm md:text-xl font-bold text-textColor"> তারিখ পর্যন্ত </h2>
          </div>
        </div>
      </div>

      <div className="grid border border-gray-300" style={{ gridTemplateColumns: getGridTemplateColumns(AloSchedule) }}>
        {AloSchedule.map((row, rowIndex) => (
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

      <div className="grid border border-gray-300" style={{ gridTemplateColumns: getGridTemplateColumns(AloSchedule2) }}>
        {AloSchedule2.map((row, rowIndex) => (
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

      <div>
        <h2 className='text-sm md:text-2xl font-hindSiliguri text-textColor mb-2'>
          রাত্রিকালীন অতি জরুরি ডিউটি-
        </h2>
        <div className='grid border border-gray-300' style={{ gridTemplateColumns: getGridTemplateColumns(AloSchedule3) }}>
          {AloSchedule3.map((row, rowIndex) => (
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
    </div>
  );
};

export default DoctorScheduleTable;
