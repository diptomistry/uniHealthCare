import React, { useState, useEffect } from "react";
import { FaTrash, FaWandMagicSparkles } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import PrimaryButton from "../../../layouts/dashboard/PrimaryButton";
import CustomModal from "../../../models/CustomModal";
import DeleteConfirmationModal from "../../../models/DeleteConfirmationModal";
import ImageGenerator from "../../../models/dashboard/ImageGenerator";
import axios from "axios";
import ContentFactory from "../../../models/dashboard/ContentFactory";
const API_BASE_URL = "http://localhost:8000/api";

const ContentManager = ({
  contentType, // 'blog' | 'service' | 'quote'
  title,
}) => {
  const [items, setItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    img: "",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const [isLoadingText, setIsLoadingText] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getContentTypeFlags = () => {
    switch (contentType) {
      case "blog":
        return { isBlog: true, quote: false };
      case "service":
        return { isBlog: false, quote: false };
      case "quote":
        return { isBlog: false, quote: true };
      default:
        return { isBlog: false, quote: false };
    }
  };

  const handleButtonClick = async () => {
    setIsLoadingText(true);
    try {
      const response = await axios.post("http://127.0.0.1:5001/improve-text", {
        text: editForm.description,
      });
      setEditForm({ ...editForm, description: response.data.corrected_text });
    } catch (error) {
      console.error("Error improving text:", error);
    } finally {
      setIsLoadingText(false);
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
        const { isBlog, quote } = getContentTypeFlags();
        const filteredItems = data.filter(
          (item) => item.isBlog === isBlog && item.qoute === quote
        );
        
        setItems(filteredItems);
      } catch (error) {
        console.error(`Error fetching ${contentType} data:`, error);
      }
    };
    fetchData();
  }, [contentType]);

  const handleDeleteClick = (index) => setDeleteIndex(index);

  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      handleDelete(items[deleteIndex].id);
      const updatedItems = items.filter((_, i) => i !== deleteIndex);
      setItems(updatedItems);
      setDeleteIndex(null);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditForm(items[index]);
    setImageSrc("");
  };
  /*
  const handleSave = async () => {
    if (!editForm.title || !editForm.description) {
      alert("Title and Description are required.");
      return;
    }
      // Create content using factory
//   const content = contentFactory.createContent(
//     contentType,
//     editForm.title,
//     editForm.description,
//     editForm.img
//   );
//   const token = localStorage.getItem("token");
//   const formData = new FormData();
//   formData.append("title", content.title);
//   formData.append("description", content.description);
//   formData.append("isBlog", String(content.isBlog));
//   formData.append("isQuote", String(content.isQuote));

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", editForm.title);
    formData.append("description", editForm.description);

     const { isBlog, isQoute } = getContentTypeFlags();
    formData.append("isBlog", String(isBlog));
    formData.append("isQoute", String(isQoute));

    if (editForm.img) {
      if (typeof editForm.img === "string" && editForm.img.startsWith("data:image")) {
        const response = await fetch(editForm.img);
        const blob = await response.blob();
        formData.append("file", blob, "image.jpg");
      } else if (editForm.img instanceof File || editForm.img instanceof Blob) {
        formData.append("file", editForm.img);
      }
    }

    try {
      let response;
      console.log(formData)
      if (isAdding) {
        response = await axios.post(`${API_BASE_URL}/blogs`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setItems([...items, response.data]);
    
      } else {
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
        setItems(
          items.map((item) => (item.id === editForm.id ? response.data : item))
        );
      }
      setEditingIndex(null);
      setIsAdding(false);
    } catch (error) {
      console.error(`Error saving ${contentType}:`, error);
      alert(`Failed to save ${contentType}. Please try again.`);
    }
  };
*/
  const handleSave = async () => {
    if (!editForm.title || !editForm.description) {
      alert("Title and Description are required.");
      return;
    }

    const token = localStorage.getItem("token");
    //console.log('Token present:', !!token);

    try {
      console.log("EditForm state:", {
        title: editForm.title,
        descriptionLength: editForm.description.length,
        imagePresent: !!editForm.img,
        imageType: typeof editForm.img,
      });

      const contentFactory = new ContentFactory();
      const content = contentFactory.createContent(
        contentType,
        editForm.title,
        editForm.description,
        editForm.img
      );

      console.log("Content created:", {
        type: contentType,
        isBlog: content.isBlog,
        isQuote: content.isQuote,
      });

      const formData = await content.createFormData();

      console.log("Request details:", {
        url: `${API_BASE_URL}/blogs`,
        method: isAdding ? "POST" : "PUT",
        contentType: isAdding ? null : editForm.id,
      });

      let response;
      if (isAdding) {
        response = await axios.post(`${API_BASE_URL}/blogs`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("POST response:", response.data);
        setItems([...items, response.data]);
      } else {
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
        console.log("PUT response:", response.data);
        setItems(
          items.map((item) => (item.id === editForm.id ? response.data : item))
        );
      }
      setEditingIndex(null);
      setIsAdding(false);
    } catch (error) {
      console.error(`Error saving ${contentType}:`, error);
      if (error.response) {
        console.error("Error response:", {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        });
      }
      alert(`Failed to save ${contentType}. Please try again.`);
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
      setImageSrc("");
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditForm({ title: "", description: "", img: "" });
    setImageSrc("");
  };

  const handleDelete = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/blogs/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error(`Error deleting ${contentType}:`, error);
      alert(`Failed to delete the ${contentType}. Please try again.`);
    }
  };

  const handleAIImageSet = async (generatedImage) => {
    setImageSrc(generatedImage);
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      setEditForm({ ...editForm, img: blob });
    } catch (error) {
      console.error("Error converting image to blob:", error);
    }
  };

  // Flag to control visibility of add/delete options
  const showAddDelete = contentType !== "quote";

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold text-center text-textColor">
          {title}
        </h1>
        {showAddDelete && (
          <button onClick={handleAdd}>
            <PrimaryButton
              title={`Add a New ${contentType}`}
              bgColor="bg-primaryColor hover:bg-hoverColor"
            />
          </button>
        )}
      </div>

      <div className="space-y-8">
        {items.map((item, index) => {
          const descriptionParagraphs = (item.description || "").split("\n");

          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-textColor dark:text-white">
                  {item.title}
                </h2>
                <div className="flex space-x-4">
                  <FaEdit
                    className="text-blue-500 hover:text-blue-700 cursor-pointer text-xl"
                    onClick={() => handleEdit(index)}
                  />
                  {showAddDelete && (
                    <FaTrash
                      className="text-red-500 hover:text-red-700 cursor-pointer text-xl"
                      onClick={() => handleDeleteClick(index)}
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  className="w-full md:w-[400px] h-60 md:h-72 rounded-xl object-cover"
                  src={item.image}
                  alt={`${contentType} image`}
                />
                <div className="flex-1 text-lg text-textColor dark:text-gray-200 overflow-auto max-h-72 md:max-h-96">
                  {descriptionParagraphs.map((paragraph, idx) => (
                    <p key={idx} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <CustomModal
        isOpen={editingIndex !== null || isAdding}
        onRequestClose={() => {
          setEditingIndex(null);
          setIsAdding(false);
        }}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">
            {isAdding ? `Add New ${contentType}` : `Edit ${contentType}`}
          </h2>
          <div className="space-y-6">
            <input
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primaryColor"
              type="text"
              name="title"
              value={editForm.title}
              onChange={handleChange}
              placeholder="Title"
            />
            <div className="relative">
              <textarea
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primaryColor pr-12"
                name="description"
                value={editForm.description}
                onChange={handleChange}
                placeholder="Description"
                rows={5}
              />
              <div className="absolute right-2 top-2">
                <button
                  onClick={handleButtonClick}
                  disabled={isLoadingText}
                  className="group flex justify-center p-2 rounded-md hover:text-black drop-shadow-xl from-gray-800 bg-[#a6a7ab] text-white font-semibold hover:translate-y-2 transition-all duration-250"
                >
                  {isLoadingText ? (
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

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                {isAdding
                  ? "Choose image from Device"
                  : "Change image from Device"}
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div className="space-y-4">
              {showAddDelete && (
                <ImageGenerator
                  setImageSrc={handleAIImageSet}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              )}
              {imageSrc && (
                <div className="border border-gray-300 rounded-xl overflow-hidden">
                  <img
                    src={imageSrc}
                    alt="Generated"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {editForm.img && !imageSrc && (
                <img
                  className="w-full h-60 rounded-xl object-cover"
                  src={editForm.img}
                  alt="Preview"
                />
              )}
            </div>

            <button
              onClick={handleSave}
              className="w-full py-2 bg-primaryColor hover:bg-hoverColor text-white rounded-lg transition duration-300"
            >
              Save
            </button>
          </div>
        </div>
      </CustomModal>

      {showAddDelete && (
        <DeleteConfirmationModal
          isOpen={deleteIndex !== null}
          onRequestClose={() => setDeleteIndex(null)}
          title={`Delete ${contentType}`}
          itemName={items[deleteIndex]?.title || ""}
          onConfirmDelete={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default ContentManager;
