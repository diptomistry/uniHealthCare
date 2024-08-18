import React, { useState, useEffect } from "react";
import SearchHeader from "./SearchHeader";
import { SearchResultsList } from "./SearchResultsList";
import AddItemButton from "../../../../layouts/doctor/AddItemButton";
import { IoMdCloseCircle } from "react-icons/io"; 
import DosageTimes from "./DosageTimes";
import DrugDetailsSection from "./DrugDetailsSection";
import Diagnosis from "./Diagnosis";
const DrugPrescription = ({ getMedicines }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Days");
  const [beforeFood, setBeforeFood] = useState(false);
  const [afterFood, setAfterFood] = useState(false);
  const [manualEntry, setManualEntry] = useState(false);
  const [manualMedicineName, setManualMedicineName] = useState("");

  const options = ["Days", "Weeks", "Months", "Years"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  //const [medicineId, setMedicineId] = useState(1);

  const fetchData = (value) => {
    fetch("http://localhost:8000/api/get-medicines")
      .then((response) => response.json())
      .then((json) => {
        const results = json.data.filter((medicine) => {
          return (
            value &&
            medicine &&
            medicine.Name &&
            medicine.Name.toLowerCase().includes(value.toLowerCase())
          );
        });
        const Data = json.data;
        //const medicineId = json.data.length > 0 ? json.data[0].MedicineID : 2;
      //  const medicineId = 1;
        setResults(results);
       // console.log("medic:", medicineId);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
    setShowMenu(true);
  };
  const [selectedItems, setSelectedItems] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showSelectedItems, setShowSelectedItems] = useState(true);

  const handleItemSelect = (item) => {
    setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
    setShowMenu(false);
    setInput("");
    setShowSelectedItems(true);
  };

  const [duration, setDuration] = useState(0);
  const handleDuration = (value) => {
    setDuration(value);
  };
  const [countValues, setCountValues] = useState([0, 0, 0]);
  useEffect(() => {}, [countValues]);

  const handleCountValues = (index, newCount) => {
    console.log(newCount);
    setCountValues((prevCountValues) => {
      const updatedCountValues = [...prevCountValues];
      updatedCountValues[index] = newCount;
      return updatedCountValues;
    });
  };
  // console.log(countValues);
  const [quantity, setQuantity] = useState([0, 0, 0]);
  const [afterBefore, setafterBefore] = useState("Not Specified");
  const [finalDuration, setFinalDuration] = useState(0);
  const handleQuantity = () => {
    setQuantity(countValues.join("-"));
  };
  const handleafterBefore = () => {
    if (beforeFood) {
      setafterBefore("Before Food");
    } else if (afterFood) {
      setafterBefore("After Food");
    }
  };
  const handleFinalDuration = () => {
    setFinalDuration(duration);
  };

  const [data, setData] = useState([]);
  const [frequency, setFrequency] = useState("daily");
  const [customFrequency, setCustomFrequency] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleAddToMedicine = () => {
    // Calculate the correct frequency before setting it in state
    const finalFrequency = frequency === "custom" ? `Every ${inputValue} Days` : frequency;
    if (frequency === "custom" && !inputValue) {
      alert("Please enter the custom frequency.");
      return;
    }
    // Ensure other states are set correctly before adding the medicine
    handleQuantity();
    handleafterBefore();
    handleFinalDuration();
  
    // Perform any necessary validation
    if (selectedItems.length === 0 && !manualEntry) {
      alert("Please select a medicine or enter it manually.");
      return;
    }
  
    if (!countValues.length) {
      alert("Please enter the quantity.");
      return;
    }
  
    if (duration==0 || !selectedOption) {
      alert("Please enter the duration.");
      return;
    }
  
    // Create a copy of the existing data
    const newData = [...data];
  
    // Determine the last selected item (either from manual entry or selection)
    const lastSelectedItem = manualEntry
      ? manualMedicineName
      : selectedItems[selectedItems.length - 1];
  
    // Check if the medicine already exists in the data array
    const existingItem = newData.find(
      (item) => item.selectedItems === lastSelectedItem
    );
  
    if (existingItem) {
      // Update the existing item if it already exists
      existingItem.quantity = countValues.join("-");
      existingItem.duration = duration + " " + selectedOption;
      existingItem.afterBefore = beforeFood
        ? "Before Food"
        : afterFood
        ? "After Food"
        : "Not Specified";
      existingItem.frequency = finalFrequency; // Set the calculated frequency
    } else {
      // If it doesn't exist, push a new item to the data array
      newData.push({
        selectedItems: lastSelectedItem,
        quantity: countValues.join("-"),
        duration: duration + " " + selectedOption,
        afterBefore: beforeFood
          ? "Before Food"
          : afterFood
          ? "After Food"
          : "Not Specified",
        frequency: finalFrequency, // Set the calculated frequency
      });
    }
  
    // Update the state with the new data
    setData(newData);
  
    // Prepare the data to send back (without selectedItems)
    const dataToSend = newData.map(({ selectedItems, ...rest }) => rest);
    getMedicines(dataToSend);
  
    // Clear relevant states after adding the medicine
    setManualEntry(false);
    setManualMedicineName("");
    setCustomFrequency(""); // Clear custom frequency after adding
    //setInputValue(""); // Clear input value for custom frequency
  
    // Optionally clear other form fields as needed
    setSelectedItems([]);
  
  };
  
  
  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };
  const handleUnckeck = () => {
    setAfterFood(false);
    setBeforeFood(false);
  };
  const handleCancelManualEntry = () => {
    setManualEntry(false);
    setManualMedicineName("");
  };
  const handleRemoveLastSelectedMedicine = () => {
    const updatedItems = [...selectedItems];
    updatedItems.pop(); // Remove the last selected item
    setSelectedItems(updatedItems);
    setShowSelectedItems(updatedItems.length > 0);
  };
  return (
    <div className="bg-blue-200 rounded-lg p-5 mt-5">
      <Diagnosis />

      <SearchHeader input={input} handleChange={handleChange} />
      {/* Add form fields or components for drug prescription details */}
      <div className="mb-4">
        {showMenu && results.length > 0 && (
          <SearchResultsList
            results={results}
            onItemSelect={handleItemSelect}
          />
        )}
      </div>
      {showSelectedItems && selectedItems.length > 0 && (
        <div className="flex bg-[#e8e2dc] gap-2 place-content-center items-center mt-2 mb-2">
          <div className="relative flex items-center">
            <span>{selectedItems[selectedItems.length - 1]}</span>
            <button
              className="ml-2"
              onClick={handleRemoveLastSelectedMedicine}
            >
              <IoMdCloseCircle className="text-red-500 text-xl" />
            </button>
          </div>
        </div>
      )}
      {!manualEntry && (
        /* From Uiverse.io by EmaCoto */
       <div className="flex justify-end mb-2 ">
        <button
         onClick={() => setManualEntry(true)}
        >
  <AddItemButton title="Add Medicine Manually" />
        </button>
      
       </div>
      )}

{manualEntry && (
        <div className="mt-4 mb-2 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Medicine Name:
          </label>
          <input
            className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            placeholder="Enter medicine name"
            value={manualMedicineName}
            onChange={(e) => setManualMedicineName(e.target.value)}
          />
          <button
            className="absolute -bottom-1 transform -translate-y-1/2 right-1"
            onClick={handleCancelManualEntry}
          >
            <IoMdCloseCircle className="text-red-500 text-2xl" />
          </button>
        </div>
      )}
        <DosageTimes handleCountValues={handleCountValues} />
      <DrugDetailsSection
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        isOpen={isOpen}
        toggleDropdown={toggleDropdown}
        options={options}
        selectOption={selectOption}
        duration={duration}
        handleDuration={handleDuration}
        beforeFood={beforeFood}
        setBeforeFood={setBeforeFood}
        afterFood={afterFood}
        setAfterFood={setAfterFood}
        handleUnckeck={handleUnckeck}
        frequency={frequency}
        setFrequency={setFrequency}
        inputValue={inputValue}
        setInputValue={setInputValue}
        setCustomFrequency={setCustomFrequency}
        handleAddToMedicine={handleAddToMedicine}
      />

      <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="border border-backgroundColor mt-3  p-3 bg-[#e8e2dc]"
          >
            <h4 className="font-semibold">
              Medicine {index + 1} : {item.selectedItems}
            </h4>

            <p>
              <strong>Quantity:</strong> {item.quantity}
            </p>
            <p>
              <strong>Duration:</strong> {item.duration}
            </p>
            <p>
              <strong>Frequency:</strong> {item.frequency}
            </p>
            <p>
              <strong>Time:</strong> {item.afterBefore}
            </p>
            <button
              className="text-red-600 hover:text-red-700 mt-2"
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="bg-blue-200 rounded-lg mt-5 ">
        <h3 className="text-lg font-semibold mb-2">Add Instructions</h3>
        <textarea
          rows="4"
          className="border border-backgroundColor focus:outline-blue-300 hover:shadow-lg hover:border-blue-300  rounded-md px-3 py-2 w-full"
          placeholder="Enter instructions or notes..."
        />
      </div>
    </div>
  );
};

export default DrugPrescription;
