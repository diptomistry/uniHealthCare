import React from 'react'

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
    <div className="flex flex-row gap-2">
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
    </div>
  </div>
  )
}

export default FullScreenLoader