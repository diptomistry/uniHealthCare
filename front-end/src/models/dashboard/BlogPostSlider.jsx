import React, { useState } from 'react';
import { FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import PrimaryButton from '../../layouts/dashboard/PrimaryButton';

const BlogPostSlider = ({ blogs, handleEdit, handleDeleteClick, handleAdd }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? blogs.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === blogs.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (blogs.length === 0) {
    return <div>No Services available.</div>;
  }

  const currentBlog = blogs[currentIndex];

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-semibold text-center text-textColor">SERVICES:</h1>
        <button onClick={handleAdd}>
          <PrimaryButton title="Add a New Service" bgColor="bg-primaryColor hover:bg-hoverColor" />
        </button>
      </div>

      {/* Card structure */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          {/* Image */}
          <img
            className="w-full h-72 rounded-xl object-cover mb-4"
            src={currentBlog.image}
            alt="Blog"
          />
          
          {/* Title */}
          <h1 className="text-2xl font-semibold text-textColor dark:text-white text-center mb-4">
            {currentBlog.title}
          </h1>

          {/* Description */}
          <div className="text-lg text-textColor dark:text-gray-200 text-justify">
            {currentBlog.description.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Edit and Delete Buttons */}
          <div className="flex justify-end space-x-2 mt-4">
            <FaEdit className="text-textColor dark:text-white cursor-pointer" onClick={() => handleEdit(currentIndex)} />
            <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDeleteClick(currentIndex)} />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 -ml-12">
        <button 
          onClick={goToPrevious}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          <FaChevronLeft size={24} />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-0 -mr-12">
        <button 
          onClick={goToNext}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          <FaChevronRight size={24} />
        </button>
      </div>

      {/* Pagination Indicator */}
      <div className="text-center mt-4 text-textColor">
        {currentIndex + 1} / {blogs.length}
      </div>
    </div>
  );
};

export default BlogPostSlider;
