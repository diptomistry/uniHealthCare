import React, { useState, useRef, useContext } from 'react';
import { UserContext } from '../services/auth/UserProvider';

const Image = () => {
  const { user } = useContext(UserContext);
  const [preview, setPreview] = useState('');
  const [file, setFile] = useState(null); // Store the selected file
  const dropzoneRef = useRef(null);
  const inputRef = useRef(null);

  const handleSubmit = async () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append('file', file); // Append the file as Blob

    const token = localStorage.getItem('token'); // Get the token from localStorage

    try {
      const response = await fetch(`http://localhost:8000/api/auth/change-image/${user.userID}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Add token for authorization
        },
        body: formData, // Send FormData
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Image uploaded successfully:", data);
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    dropzoneRef.current.classList.add('border-indigo-600');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    dropzoneRef.current.classList.remove('border-indigo-600');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    dropzoneRef.current.classList.remove('border-indigo-600');
    const droppedFile = e.dataTransfer.files[0];
    displayPreview(droppedFile);
    setFile(droppedFile); // Store the file for later use
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    displayPreview(selectedFile);
    setFile(selectedFile); // Store the file for later use
  };

  const displayPreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  };

  return (
    <div>
      <div 
        ref={dropzoneRef}
        className="w-[400px] relative border-2 border-gray-300 border-dashed rounded-lg p-6 m-6"
        id="dropzone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input 
          ref={inputRef}
          type="file" 
          className="absolute inset-0 w-full h-full opacity-0 z-50" 
          id="file-upload"
          onChange={handleFileChange}
        />
        <div className="text-center">
          <img 
            className="mx-auto h-12 w-12" 
            src="https://www.svgrepo.com/show/357902/image-upload.svg" 
            alt="upload-icon"
          />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            <label htmlFor="file-upload" className="relative cursor-pointer">
              <span>Drag and drop</span>
              <span className="text-indigo-600"> or browse</span>
              <span> to upload Profile Image</span>
            </label>
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            PNG, JPG, JPEG up to 10MB
          </p>
        </div>
        {preview && (
          <img 
            src={preview} 
            className="mt-4 mx-auto max-h-40" 
            id="preview" 
            alt="preview"
          />
        )}
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="text-white mb-10 bg-primaryColor hover:bg-hoverColor focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primaryColor dark:focus:ring-blue-800 min-w-full"
      >
        Submit
      </button>
    </div>
  );
};

export default Image;
