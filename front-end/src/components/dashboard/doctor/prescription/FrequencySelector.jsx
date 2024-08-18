import React, { useState } from "react";

const FrequencySelector = ({ frequency, setFrequency, setCustomFrequency, inputValue, setInputValue }) => {
  const handleFrequencyChange = (event) => {
    setFrequency(event.target.value);
  };

  const handleCustomFrequencyInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="w-40">
      <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
        Frequency
      </label>
      <select
        id="frequency"
        name="frequency"
        value={frequency}
        onChange={handleFrequencyChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="daily">Daily</option>
        <option value="every-2-days">Every 2 Days</option>
        <option value="every-3-days">Every 3 Days</option>
        <option value="every-4-days">Every 4 Days</option>
        <option value="weekly">Weekly</option>
        <option value="custom">Custom...</option>
      </select>

      {frequency === "custom" && (
        <div className="mt-4">
          <label htmlFor="customFrequency" className="block text-sm font-medium text-gray-700">
         (days)
          </label>
          <input
            type="number"
            id="customFrequency"
            name="customFrequency"
            value={inputValue}
            onChange={handleCustomFrequencyInputChange}
            placeholder="Enter no. of days"
            className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default FrequencySelector;
