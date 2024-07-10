import React from 'react'

const NursingSchedule = () => {
  const schedule = [
    ['বার', 'সকাল ৮.০০-দুপুর ২.০০টা', 'দুপুর ২.০০-বিকাল ৬.০০টা', 'বিকাল ৬.০০-রাত ১০.০০টা', 'রাত ১০.০০ থেকে সকাল ৮.০০টা'],
    ['রবিবার', 'জান্নাতুল ফেরদৌসি', 'মোস্তাফিজুর রহমান', 'মোস্তাফিজুর রহমান', 'ইয়াসমিন হক বিল্কিস'],
    ['সোমবার', 'জান্নাতুল ফেরদৌসি', 'ইয়াসমিন জাহান', 'শরীফ হোসাইন', 'মোস্তাফিজুর রহমান'],
    ['মঙ্গলবার', 'জান্নাতুল ফেরদৌসি', 'শরীফ হোসাইন', 'শরীফ হোসাইন', 'মোস্তাফিজুর রহমান'],
    ['বুধবার', 'জান্নাতুল ফেরদৌসি', 'ইয়াসমিন হক বিল্কিস', 'ইয়াসমিন হক বিল্কিস', 'সৈয়দ চন্দ্র দত্ত'],
    ['বৃহস্পতিবার', 'ইয়াসমিন জাহান', 'শরীফ হোসাইন', 'শরীফ হোসাইন', 'সৈয়দ চন্দ্র দত্ত'],
    ['শুক্রবার', 'জান্নাতুল ফেরদৌসি', 'ইয়াসমিন জাহান', 'শরীফ হোসাইন', 'শরীফ হোসাইন'],
    ['শনিবার', 'ইয়াসমিন জাহান', 'সৈয়দ চন্দ্র দত্ত', 'সৈয়দ চন্দ্র দত্ত', 'ইয়াসমিন হক বিল্কিস']
  ];

  return (
    <div className='flex flex-col gap-5'>
    <div className=' flex flex-row justify-between'>
    <div>
    <h2 className="text-2xl font-hindSiliguri text-textColor  ">নার্সিং শাখার ডিউটি রোস্টার </h2>
    </div>
    
  
      <div className='flex flex-row gap-2'>
        <div className='flex gap-2'>
        <h2 className="text-xl font-bold text-primaryColor  ">৯ই জুলাই ২০২৪ </h2>
        <h2 className="text-xl font-bold text-textColor  ">তারিখ থেকে </h2>
        
        </div>
        <div className='flex gap-2'>
        <h2 className="text-xl font-bold text-primaryColor  "> ১০ই জুলাই ২০২৪</h2>
        <h2 className="text-xl font-bold text-textColor  "> তারিখ পর্যন্ত </h2>
        </div>
        </div>

 </div>
    <div className="grid grid-cols-5  border border-gray-300">
        
      {schedule.map((row, rowIndex) => (
        row.map((cell, cellIndex) => (
          <div 
            key={`${rowIndex}-${cellIndex}`} 
            className={`p-2 border border-gray-300 ${rowIndex === 0 ? 'font-bold bg-gray-100' : ''}`}
          >
            {cell}
          </div>
        ))
      ))}
    </div>
    </div>
  )
}

export default NursingSchedule