import React from 'react'

const PharmacySchedule = () => {
  const schedule = [
    ['বার', 'সকাল ৮.৩০-দুপুর ২.৩০টা পর্যন্ত', 'দুপুর ২.৩০-রাত ৯.৩০টা পর্যন্ত'],
    ['রবিবার', 'মোঃ রুবেল মাহমুদ\nমোঃ শাহজুল আলম', 'মোসাঃ ফতিমা আক্তার\nবিশজিত তালুকদার'],
    ['সোমবার', 'মোঃ রুবেল মাহমুদ\nবিশজিত তালুকদার', 'মোসাঃ ফতিমা আক্তার\nমোঃ শাহজুল আলম'],
    ['মঙ্গলবার', 'মোঃ রুবেল মাহমুদ\nমোঃ শাহজুল আলম', 'মোঃ সায়েদুর রহমান\nবিশজিত তালুকদার'],
    ['বুধবার', 'মোঃ সায়েদুর রহমান\nবিশজিত তালুকদার', 'মোঃ রুবেল মাহমুদ\nমোঃ শাহজুল আলম'],
    ['বৃহস্পতিবার', 'মোঃ রুবেল মাহমুদ\nমোঃ শাহজুল আলম', 'মোঃ সায়েদুর রহমান\nমোসাঃ ফতিমা আক্তার'],
    ['শুক্রবার', 'মোসাঃ ফতিমা আক্তার', 'মোঃ সায়েদুর রহমান'],
    ['শনিবার', 'মোঃ সায়েদুর রহমান\nমোসাঃ ফতিমা আক্তার', 'বিশজিত তালুকদার']
  ];

  return (
    <div className='flex flex-col gap-5'>
         <div className=' flex flex-row justify-between'>
            <div>
            <h2 className="text-2xl font-hindSiliguri text-textColor  ">ফার্মাসি শাখার ডিউটি রোস্টার </h2>
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
        
    <div className="grid grid-cols-3  border border-gray-300">
      {schedule.map((row, rowIndex) => (
        row.map((cell, cellIndex) => (
          <div 
            key={`${rowIndex}-${cellIndex}`} 
            className={`p-2 border border-gray-300 ${rowIndex === 0 ? 'font-bold bg-gray-100' : ''}`}
          >
            {cell.split('\n').map((line, lineIndex) => (
              <React.Fragment key={lineIndex}>
                {line}
                {lineIndex < cell.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
        ))
      ))}
    </div>
    </div>
  )
}

export default PharmacySchedule