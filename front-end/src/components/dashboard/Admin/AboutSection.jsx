import React, { useState, useEffect } from "react";
import { aboutUsData } from "../../../assets/dashboard";
import Button from "../../../layouts/dashboard/DutyRoster/Button";
import { MdOutlineCloudUpload } from "react-icons/md";
import DeleteConfirmationModal from "../../../models/DeleteConfirmationModal";


import Services from "./Services";


const AboutSection = () => {
  const [aboutUs, setAboutUs] = useState("");
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState("");
  const [images, setImages] = useState([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemType, setDeleteItemType] = useState(null);
  const [deleteItemIndex, setDeleteItemIndex] = useState(null);
  const fetchImages = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8000/api/about-us/public/1", {
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
      console.log("Data:", data);
      setAboutUs(data.description);
      
      // No need to parse the URLs as JSON
      const parsedImageUrls = data.imageUrls.map((img) => img);
  
      setImages(parsedImageUrls);
    } catch (error) {
      console.error("Error fetching images:", error.message);
    }
  };
  
  const fetchDepartments = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8000/api/departments", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error text:", errorText);
        throw new Error("Failed to fetch department data");
      }
      const data = await response.json();
      const departmentData = data.map((department) => ({
        id: department.departmentID,
        name: department.name,
      }));

      setDepartments(departmentData);
    } catch (error) {
      console.error("Error fetching departments:", error.message);
    }
  };
  useEffect(() => {
    
    //to fetch department data:post:localhost:8000/api/departments
    
    fetchDepartments();

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
      const departmentIdToDelete = departments[deleteItemIndex].id;
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `http://localhost:8000/api/departments/${departmentIdToDelete}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error text:", errorText);
          throw new Error(
            `Failed to delete department with status ${response.status}`
          );
        }

        setDepartments(departments.filter((_, i) => i !== deleteItemIndex));
      } catch (error) {
        console.error("Error deleting department:", error.message);
      }
    } else if (deleteItemType === "image") {
      const imageUrlToDelete = images[deleteItemIndex];
      const token = localStorage.getItem("token");

      try {
        console.log("Image URL to delete:", imageUrlToDelete);
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
        console.log("Response:", response);
        console.log("Image deleted successfully");
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error text:", errorText);
          throw new Error(
            `Failed to delete image with status ${response.status}`
          );
        }

        setImages(images.filter((_, i) => i !== deleteItemIndex));
      } catch (error) {
        console.error("Error deleting image:", error.message);
      }
    }
    closeDeleteModal();
  };

  const handleAddDepartment = async () => {
    if (newDepartment.trim()) {
      const token = localStorage.getItem("token");
      const newDeptData = {
        name: newDepartment.trim(),
        description: "",
        image: "",
      };

      try {
        const response = await fetch("http://localhost:8000/api/departments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newDeptData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error text:", errorText);
          throw new Error(
            `Failed to add department with status ${response.status}`
          );
        }

        // Assuming the response contains the added department's details
        const addedDepartment = await response.json();

        // Update the state with the newly added department
        setDepartments([...departments, addedDepartment]);
        //after adding dept reload fetchDepartments
        
        await fetchDepartments();
        setNewDepartment(""); // Clear the input field
      } catch (error) {
        console.error("Error adding department:", error.message);
      }
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
          "http://localhost:8000/api/about-us/upload-image/1",
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
        console.log("Image URL:", url);

     
        setImages((prevImages) => [...prevImages, url]);
        await fetchImages();
      } catch (error) {
        console.error("Error uploading image:", error.message);
      }
    }
  };
  const handleAboutUsSubmit = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:8000/api/about-us/update-single-about-us/1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ description: aboutUs }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error text:", errorText);
        throw new Error(
          `Failed to update About Us with status ${response.status}`
        );
      }

      alert("About Us updated successfully!");
    } catch (error) {
      console.error("Error updating About Us:", error.message);
    }
  };
 

  return (
    <div className="flex flex-col  gap-10 mb-20">
      <div className="w-full  bg-white dark:bg-secondary-dark-bg mt-3 mb-3 rounded-2xl shadow-md p-2">
        <h2 className="text-2xl font-poppins font-semibold text-textColor flex justify-center mb-4">
          About Us
        </h2>
        <textarea
          value={aboutUs}
          onChange={handleAboutUsChange}
          rows="8"
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <button onClick={handleAboutUsSubmit} className="w-full">
          {" "}
          <Button title={"Submit"} />
        </button>
        <h2 className="text-2xl font-hindSiliguri mt-4 font-semibold text-textColor flex justify-center mb-4">
          বিভাগসমূহ
        </h2>
        <div className="flex flex-wrap gap-6 mb-5">
          {departments.map((department, index) => (
            <li
              key={department.id}
              className="flex justify-between items-center bg-gray-100 rounded-full px-3 py-1"
            >
              <span>{department.name}</span>
              <button
                onClick={() => openDeleteModal("department", index)}
                className="ml-2 text-red-500 font-bold"
              >
                ×
              </button>
            </li>
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
        <div className="mb-5">
          <h2 className="text-2xl font-poppins font-semibold text-textColor flex justify-center mt-4 mb-4">
            Images
          </h2>
          <div className="flex flex-wrap gap-6 mb-5">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Image ${index}`}
                  className="w-28 h-24 object-cover rounded"
                />
                <button
                  onClick={() => openDeleteModal("image", index)}
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
      <div className="w-full  bg-white dark:bg-secondary-dark-bg mt-3 mb-3 rounded-2xl shadow-md p-2">
     
        <div className="m-10 ">
        <Services/>

        </div>
        
      </div>
     

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        itemName={
          deleteItemType === "department"
            ? departments[deleteItemIndex].name
            : "the image"
        }
        onConfirmDelete={confirmDelete}
      />
    </div>
  );
};

export default AboutSection;
