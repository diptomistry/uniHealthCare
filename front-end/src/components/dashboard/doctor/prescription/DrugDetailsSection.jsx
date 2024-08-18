import React from "react";
import Button from "../../../../layouts/dashboard/DutyRoster/Button";
import FrequencySelector from "./FrequencySelector";

const DrugDetailsSection = ({
  selectedOption,
  setSelectedOption,
  isOpen,
  toggleDropdown,
  options,
  selectOption,
  duration,
  handleDuration,
  beforeFood,
  setBeforeFood,
  afterFood,
  setAfterFood,
  handleUnckeck,
  frequency,
  setFrequency,
  inputValue,
  setInputValue,
  setCustomFrequency,
  handleAddToMedicine,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between border-[1px] border-backgroundColor p-2 md:grid-cols-2 mt-3 bg-backgroundColor/10">
      <div className="grid-cols-1 grid-rows-2 gap-2">
        <div className="flex gap-1 mb-1 justify-center">
          <h1>Duration</h1>
          <div className="relative inline-block ml-1">
            <button
              className="border text-sm text-teal-700 font-semibold rounded inline-flex items-center"
              onClick={toggleDropdown}
            >
              <span>{selectedOption}</span>
              <svg
                className="ml-2 h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-10 bg-white rounded-md shadow-lg overflow-hidden z-10 w-[180px]">
                {options.map((option) => (
                  <button
                    key={option}
                    className={`w-full text-left px-4 py-2 hover:bg-backgroundColor border-2 ${
                      option === selectedOption ? "bg-backgroundColor" : ""
                    }`}
                    onClick={() => selectOption(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <input
            type="number"
            className="w-[120px] h-8 text-center bg-white text-teal-700 font-bold border border-gray-300 mx-2 rounded-lg focus:outline-blue-300 hover:shadow-lg hover:border-blue-300"
            value={duration}
            onChange={(e) => handleDuration(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-2">
        <div className="flex items-center mt-2 justify-center ml-3">
          <input
            type="radio"
            id="beforeFood"
            name="foodTiming"
            checked={beforeFood}
            onChange={(e) => {
              setBeforeFood(e.target.checked);
              setAfterFood(!e.target.checked);
            }}
            onClick={handleUnckeck}
            className="mr-2"
          />
          <label htmlFor="beforeFood">Before Food</label>
        </div>
        <div className="flex items-center justify-center mb-2">
          <input
            type="radio"
            id="afterFood"
            name="foodTiming"
            checked={afterFood}
            onChange={(e) => {
              setAfterFood(e.target.checked);
              setBeforeFood(!e.target.checked);
            }}
            onClick={handleUnckeck}
            className="mr-2"
          />
          <label htmlFor="afterFood">After Food</label>
        </div>
      </div>
      <div className="flex justify-center">
        <FrequencySelector
          frequency={frequency}
          setFrequency={setFrequency}
          inputValue={inputValue}
          setInputValue={setInputValue}
          setCustomFrequency={setCustomFrequency}
        />
      </div>
      <button
        className="flex justify-center items-center mt-3"
        onClick={handleAddToMedicine}
      >
        <Button title="Add to Medicine" />
      </button>
    </div>
  );
};

export default DrugDetailsSection;
