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
            "Our organizational culture fosters creativity and innovation with 
            endless opportunities and rewards. At Therap, your ideas will 
            matter and make a difference."
          </blockquote>
        </div>
      </div>
    </div>
  )
}

export default AdminQuote