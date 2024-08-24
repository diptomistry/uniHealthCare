import React, { useState, useEffect } from "react";
import { aboutUsData } from "../../../assets/dashboard";
import Button from "../../../layouts/dashboard/DutyRoster/Button";
import { MdOutlineCloudUpload } from "react-icons/md";
import DeleteConfirmationModal from "../../../models/DeleteConfirmationModal";

const AboutSection = () => {
  const [aboutUs, setAboutUs] = useState(aboutUsData.aboutUs);
  const [departments, setDepartments] = useState(aboutUsData.departments);
  const [newDepartment, setNewDepartment] = useState("");
  const [images, setImages] = useState([]);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemType, setDeleteItemType] = useState(null);
  const [deleteItemIndex, setDeleteItemIndex] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("http://localhost:8000/api/about-us/1", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error text:", errorText);
          throw new Error("Failed to fetch image URLs");
        }

        const data = await response.json();

        const parsedImageUrls = data.imageUrls.map((img) => {
          const parsedUrlObj = JSON.parse(img);
          return parsedUrlObj.imageUrl;
        });

        setImages(parsedImageUrls);
      } catch (error) {
        console.error("Error fetching images:", error.message);
      }
    };

    fetchImages();
  }, []);

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

  const confirmDelete = async () => {
    if (deleteItemType === "department") {
      setDepartments(departments.filter((_, i) => i !== deleteItemIndex));
    } else if (deleteItemType === "image") {
      const imageUrlToDelete = images[deleteItemIndex];
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          "http://localhost:8000/api/about-us/delete-image/1",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ imageUrl: imageUrlToDelete }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error text:", errorText);
          throw new Error(`Failed to delete image with status ${response.status}`);
        }

        setImages(images.filter((_, i) => i !== deleteItemIndex));
      } catch (error) {
        console.error("Error deleting image:", error.message);
      }
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

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    const token = localStorage.getItem("token");

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        // Step 1: Upload the image to get its URL
        const uploadResponse = await fetch(
          "http://localhost:8000/api/files/upload",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );
       // console.log("Upload response:", uploadResponse);
        if (!uploadResponse.ok) {
          const errorText = await uploadResponse.text();
          console.error("Upload response:", errorText);
          throw new Error(
            `Image upload failed with status ${uploadResponse.status}`
          );
        }

        // Parse the response as text, not JSON
        const url = await uploadResponse.text();

        // Step 2: Post the image URL to the About Us API
        const saveResponse = await fetch(
          "http://localhost:8000/api/about-us/upload-image/1",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ imageUrl: url }),
          }
        );

        if (!saveResponse.ok) {
          const errorText = await saveResponse.text();
          console.error("Save response:", errorText);
          throw new Error(
            `Failed to save image URL with status ${saveResponse.status}`
          );
        }

        setImages((prevImages) => [...prevImages, url]);
      } catch (error) {
        console.error("Error uploading image:", error.message);
      }
    }
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
