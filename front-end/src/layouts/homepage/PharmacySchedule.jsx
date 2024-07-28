import React from 'react'
import { PharmacySectionSchedule } from '../../assets/dashboard';
const PharmacySchedule = () => {
 
  const getGridTemplateColumns = (PharmacySectionSchedule) => `repeat(${PharmacySectionSchedule[0].length}, 1fr)`;


  return (
    <div className='flex flex-col gap-5'>
         <div className=' flex flex-row justify-between'>
            <div>
            <h2 className="text-sm md:text-2xl font-hindSiliguri text-textColor  ">ফার্মাসি শাখার ডিউটি রোস্টার </h2>
            </div>
            
          
              <div className='flex flex-row gap-2'>
                <div className='flex gap-2'>
                <h2 className="text-sm md:text-xl font-bold text-primaryColor  ">৯ই জুলাই ২০২৪ </h2>
                <h2 className="text-sm md:text-xl font-bold text-textColor  ">তারিখ থেকে </h2>
                
                </div>
                <div className='flex gap-2'>
                <h2 className="text-sm md:text-xl font-bold text-primaryColor  "> ১০ই জুলাই ২০২৪</h2>
                <h2 className="text-sm md:text-xl font-bold text-textColor  "> তারিখ পর্যন্ত </h2>
                </div>
                </div>

         </div>
        
    <div className="grid  border border-gray-300"style={{ gridTemplateColumns: getGridTemplateColumns(PharmacySectionSchedule) }}>
      {PharmacySectionSchedule.map((row, rowIndex) => (
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