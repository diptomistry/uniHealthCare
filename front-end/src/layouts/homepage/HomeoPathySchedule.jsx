import React from 'react';

const HomeoPathySchedule = () => {
  const schedule = [
    ['বার', 'সকাল ৮.০০-দুপুর ২.০০টা', 'দুপুর ২.০০-বিকাল ৬.০০টা'],
    ['রবিবার', 'জান্নাতুল ফেরদৌসি \nইয়াসমিন হক বিল্কিস', 'মোস্তাফিজুর রহমান'],
    ['সোমবার', 'জান্নাতুল ফেরদৌসি', 'ইয়াসমিন জাহান'],
    ['মঙ্গলবার', 'জান্নাতুল ফেরদৌসি', 'শরীফ হোসাইন'],
    ['বুধবার', 'জান্নাতুল ফেরদৌসি', 'ইয়াসমিন হক বিল্কিস'],
    ['বৃহস্পতিবার', 'ইয়াসমিন জাহান', 'শরীফ হোসাইন'],
    ['শুক্রবার', 'জান্নাতুল ফেরদৌসি', 'ইয়াসমিন জাহান'],
    ['শনিবার', 'ইয়াসমিন জাহান', 'সৈয়দ চন্দ্র দত্ত'],
  ];

  const columnCount = schedule[0].length;

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-row justify-between'>
        <div>
          <h2 className="text-sm md:text-2xl font-hindSiliguri text-textColor">হোমিও ডাক্তারদের ডিউটি রোস্টার</h2>
        </div>
        <div className='flex flex-row gap-2'>
          <div className='flex gap-2'>
            <h2 className="text-sm md:text-xl font-bold text-primaryColor">৯ই জুলাই ২০২৪</h2>
            <h2 className="text-sm md:text-xl font-bold text-textColor">তারিখ থেকে</h2>
          </div>
          <div className='flex gap-2'>
            <h2 className="text-sm md:text-xl font-bold text-primaryColor">১০ই জুলাই ২০২৪</h2>
            <h2 className="text-sm md:text-xl font-bold text-textColor">তারিখ পর্যন্ত</h2>
          </div>
        </div>
      </div>

      <div 
        className="grid border border-gray-300" 
        style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}
      >
        {schedule.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <div
              key={`${rowIndex}-${cellIndex}`}
              className={`p-2 border border-gray-300 overflow-auto ${rowIndex === 0 ? 'font-bold bg-gray-100' : ''}`}
            >
              {cell.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomeoPathySchedule;
