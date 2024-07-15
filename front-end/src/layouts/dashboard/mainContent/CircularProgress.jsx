import React from 'react'

const CircularProgress = () => {
  const circumference = 2 * Math.PI * 60; // Adjusted for smaller radius
  const percent = 66;
  return (
    <div className="flex items-center justify-center">
      <svg className="transform -rotate-90 w-36 h-36"> {/* Adjusted for smaller size */}
        <circle
          cx="72.5"
          cy="72.5"
          r="60"
          stroke="currentColor"
          strokeWidth="15"
          fill="transparent"
          className="text-gray-700"
        />
        <circle
          cx="72.5"
          cy="72.5"
          r="60"
          stroke="currentColor"
          strokeWidth="15"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (percent / 100) * circumference}
          className="text-blue-500"
        />
      </svg>
      <span className="absolute text-3xl text-blue-500">{`${percent}%`}</span> {/* Adjusted for smaller text */}
    </div>
  )
}

export default CircularProgress
