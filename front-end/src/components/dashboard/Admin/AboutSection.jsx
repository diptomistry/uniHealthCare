import React, { useState } from "react";
import { aboutUsData } from "../../../assets/dashboard";
import Button from "../../../layouts/dashboard/DutyRoster/Button";
import { mortazaImages } from "../../../assets/dashboard";
import { MdOutlineCloudUpload } from "react-icons/md";
import DeleteConfirmationModal from "../../../models/DeleteConfirmationModal";

const AboutSection = () => {
  const [aboutUs, setAboutUs] = useState(aboutUsData.aboutUs);
  const [departments, setDepartments] = useState(aboutUsData.departments);
  const [newDepartment, setNewDepartment] = useState("");
  const [images, setImages] = useState(mortazaImages);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemType, setDeleteItemType] = useState(null);
  const [deleteItemIndex, setDeleteItemIndex] = useState(null);

  const handleAboutUsChange = (e) => {
    setAboutUs(e.target.value);
  };

  const openDeleteModal = (type, index) => {
    setDeleteItemType(type);
    setDeleteItemIndex(index);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteItemType(null);
    setDeleteItemIndex(null);
  };

  const confirmDelete = () => {
    if (deleteItemType === 'department') {
      setDepartments(departments.filter((_, i) => i !== deleteItemIndex));
    } else if (deleteItemType === 'image') {
      setImages(images.filter((_, i) => i !== deleteItemIndex));
    }
    closeDeleteModal();
  };

  const handleAddDepartment = () => {
    if (newDepartment.trim()) {
      setDepartments([...departments, newDepartment.trim()]);
      setNewDepartment("");
    }
  };

  const handleNewDepartmentChange = (e) => {
    setNewDepartment(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddDepartment();
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...newImages]);
  };

  return (
    <div className="flex flex-col md:flex-row gap-10">
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-poppins font-semibold text-textColor flex justify-center mb-4">About Us</h2>
        <textarea
          value={aboutUs}
          onChange={handleAboutUsChange}
          rows="8"
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <Button title={'Submit'} />
        <div className="mb-5">
          <h2 className="text-2xl font-poppins font-semibold text-textColor flex justify-center mt-4 mb-4">Images</h2>
          <div className="flex flex-wrap gap-6 mb-5">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative"
              >
                <img src={image} alt={`Image ${index}`} className="w-28 h-24 object-cover rounded" />
                <button
                  onClick={() => openDeleteModal('image', index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="imageUpload"
              multiple
            />
            <label
              htmlFor="imageUpload"
              className="bg-primaryColor hover:bg-hoverColor text-white px-4 py-2 rounded cursor-pointer flex items-center"
            >
              <span>Upload new images from Gallery</span>
              <MdOutlineCloudUpload size={20} className="ml-2" />
            </label>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-hindSiliguri font-semibold text-textColor flex justify-center mb-4">বিভাগসমূহ</h2>
        <div className="flex flex-wrap gap-6 mb-5">
          {departments.map((dept, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 rounded-full px-3 py-1"
            >
              <span>{dept}</span>
              <button
                onClick={() => openDeleteModal('department', index)}
                className="ml-2 text-red-500 font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newDepartment}
            onChange={handleNewDepartmentChange}
            onKeyDown={handleKeyPress}
            placeholder="Add new department"
            className="flex-grow p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleAddDepartment}
            className="bg-primaryColor hover:bg-hoverColor text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
        <div className="mb-2">
          <h1 className="flex justify-center font-poppins font-semibold text-2xl mb-4 text-textColor">Services</h1>
          <textarea
            value={aboutUsData.doctorsTreatment}
            rows="2"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <textarea
            value={aboutUsData.MedicalTest}
            rows="2"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <textarea
            value={aboutUsData.Medicine}
            rows="2"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <Button title={'Submit'} />
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        itemName={deleteItemType === 'department' ? departments[deleteItemIndex] : 'the image'}
        onConfirmDelete={confirmDelete}
      />
    </div>
  );
};

export default AboutSection;