import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import CustomModal from "../CustomModal";
import axios from "axios";
import { FaWandMagicSparkles } from "react-icons/fa6";

const API_BASE_URL = "http://localhost:8000/api";

const Quote = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    img: "",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/improve-text", {
        text: editForm.description,
      });
      setEditForm({ ...editForm, description: response.data.corrected_text });
    } catch (error) {
      console.error("Error improving text:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/blogs`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("Data:", data);
        const filteredBlogs = data.filter((blog) => blog.qoute === true);
        setBlogs(filteredBlogs);
      } catch (error) {
        console.error("An error occurred while fetching blog data:", error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditForm(blogs[index]);
  };

  const handleSave = async () => {
    if (!editForm.title || !editForm.description) {
      alert("Title and Description are required.");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", editForm.title);
    formData.append("description", editForm.description);

    if (editForm.img) {
      if (
        typeof editForm.img === "string" &&
        editForm.img.startsWith("data:image")
      ) {
        const response = await fetch(editForm.img);
        const blob = await response.blob();
        formData.append("file", blob, "image.jpg");
      } else if (editForm.img instanceof File || editForm.img instanceof Blob) {
        formData.append("file", editForm.img);
      }
    }

    try {
      formData.append("isBlog", "false");
      formData.append("isQoute", "true");
      let response;
      if (isAdding) {
        response = await axios.post(`${API_BASE_URL}/blogs`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setBlogs([...blogs, response.data]);
      } else {
        console.log("Edit form:", editForm);

        response = await axios.put(
          `${API_BASE_URL}/blogs/${editForm.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setBlogs(
          blogs.map((blog) => (blog.id === editForm.id ? response.data : blog))
        );
      }
      setEditingIndex(null);
      setIsAdding(false);
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save blog. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditForm({ ...editForm, img: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      {blogs.map((blog, index) => (
        <div
          key={index}
          className="w-full mx-auto bg-white p-6 rounded-lg shadow-md relative mb-5"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Message from Chief Medical Officer
          </h2>
          <div className="flex flex-col md:flex-row items-center space-x-4">
            <div className="flex-shrink-0 relative">
              <img
                src={blog.image || blog.img} // Ensure this points to the correct image property
                alt="Chief Medical Officer"
                className="w-48 h-48 rounded-full border-4 border-yellow-400"
              />
            </div>
            <div className="flex-grow">
              <div className="bg-lime-200 py-2 px-4 rounded-lg">
                <h3 className="text-xl font-semibold">{blog.title}</h3>
              </div>
              <blockquote className="mt-4 text-gray-700 italic">
                {blog.description}
              </blockquote>
              <button
                onClick={() => handleEdit(index)}
                className="absolute top-0 right-0 p-2 m-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300"
              >
                <FaEdit className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      ))}

      <CustomModal
        isOpen={editingIndex !== null || isAdding}
        onRequestClose={() => {
          setEditingIndex(null);
          setIsAdding(false);
        }}
      >
        <h2 className="text-xl font-bold mb-4">Edit Quote</h2>
        <input
          className="border p-2 w-full mb-4"
          type="text"
          name="title"
          value={editForm.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <div className="relative">
          <textarea
            className="border p-2 w-full mb-4 pr-12"
            name="description"
            value={editForm.description}
            onChange={handleChange}
            placeholder="Description"
            rows={5}
          />
          <div className="absolute right-2 top-0 p-2">
            <button
              onClick={handleButtonClick}
              disabled={isLoading}
              className="group flex justify-center p-2 rounded-md hover:text-black drop-shadow-xl from-gray-800 bg-[#a6a7ab] text-white font-semibold hover:translate-y-2 transition-all duration-250 hover:from-[#331029] hover:to-[#310413]"
            >
              {isLoading ? (
                <FaWandMagicSparkles className="animate-spin" />
              ) : (
                <FaWandMagicSparkles />
              )}
              <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-md group-hover:-translate-y-12 duration-500">
                Improve
              </span>
            </button>
          </div>
        </div>
        <label className="block mb-2 text-gray-400">
          {isAdding ? "Choose image from Device " : "Change image from Device"}
        </label>
        <input
          className="border p-2 w-full mb-4"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {editForm.img && (
          <img
            className="w-[400px] h-60 rounded-xl mb-4"
            src={editForm.img}
            alt="Preview"
          />
        )}

        <button
          onClick={handleSave}
          className="bg-primaryColor hover:bg-hoverColor text-white px-4 py-2 rounded-md transition duration-300 w-full mb-4"
        >
          Save
        </button>
      </CustomModal>
    </div>
  );
};

export default Quote;
