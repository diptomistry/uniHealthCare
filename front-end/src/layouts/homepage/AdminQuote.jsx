import React from 'react'
import adminImg from '../../assets/img/admin.jpeg'

const AdminQuote = () => {
  return (
    <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Message from Chief Medical Officer</h2>
      <div className="flex flex-col md:flex-row items-center space-x-4">
        <div className="flex-shrink-0">
          <img 
            src={adminImg}
            alt="Chief Medical Officer" 
            className="w-48 h-48 rounded-full border-4 border-yellow-400"
          />
        </div>
        <div className="flex-grow">
          <div className="bg-lime-200 py-2 px-4 rounded-lg">
            <h3 className="text-xl font-semibold">Dr. Mohammad Tanvir Ali</h3>
          </div>
          <blockquote className="mt-4 text-gray-700 italic">
            "As a medical officer, I believe in the power of preventive care to build a healthier community.
             Early detection, regular check-ups, and education are key to managing health effectively.
              Our goal is to empower individuals with the knowledge and resources they need to make informed decisions.
               By working together, we can improve health outcomes and enhance quality of life for everyone.
                Let's prioritize wellness and take proactive steps towards a healthier future."
          </blockquote>
        </div>
      </div>
    </div>
  )
}

export default AdminQuote