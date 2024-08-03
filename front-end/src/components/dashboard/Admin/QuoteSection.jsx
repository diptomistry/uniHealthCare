import React, { useState } from "react";
import adminImg from "../../../assets/img/admin.jpeg";
import { FaEdit } from "react-icons/fa";
import CustomModal from "../../../models/CustomModal";
import PrimaryButton from "../../../layouts/dashboard/PrimaryButton";

const QuoteSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(adminImg);
  const [name, setName] = useState("Dr. Mohammad Tanvir Ali");
  const [quote, setQuote] = useState(
    "As a medical officer, I believe in the power of preventive care to build a healthier community. Early detection, regular check-ups, and education are key to managing health effectively. Our goal is to empower individuals with the knowledge and resources they need to make informed decisions. By working together, we can improve health outcomes and enhance quality of life for everyone. Let's prioritize wellness and take proactive steps towards a healthier future."
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (e) => setName(e.target.value);
  const handleQuoteChange = (e) => setQuote(e.target.value);

  return (
    <div className="md:mt-60 mt-32">
      <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-md relative">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Message from Chief Medical Officer
        </h2>
        <div className="flex flex-col md:flex-row items-center space-x-4">
          <div className="flex-shrink-0 relative">
            <img
              src={image}
              alt="Chief Medical Officer"
              className="w-48 h-48 rounded-full border-4 border-yellow-400"
            />
            <button
              onClick={openModal}
              className="absolute top-0 right-0 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300"
            >
              <FaEdit className="text-gray-700" />
            </button>
          </div>
          <div className="flex-grow">
            <div className="bg-lime-200 py-2 px-4 rounded-lg">
              <h3 className="text-xl font-semibold">{name}</h3>
            </div>
            <blockquote className="mt-4 text-gray-700 italic">
              {quote}
            </blockquote>
          </div>
        </div>
      </div>

      <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2 className="text-2xl font-bold mb-4">Edit Quote</h2>
        <form className="space-y-4">
          <div>
            <label className="block mb-2 font-semibold">Name</label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Quote</label>
            <textarea
              value={quote}
              onChange={handleQuoteChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="4"
            ></textarea>
          </div>
          <div>
            <label className="block mb-2 font-semibold">Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={closeModal}>
            <PrimaryButton title="Save" bgColor="bg-primaryColor hover:bg-hoverColor" />
            </button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default QuoteSection;
