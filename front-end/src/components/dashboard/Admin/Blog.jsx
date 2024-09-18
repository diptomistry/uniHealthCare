import React, { useState,useEffect } from 'react';
import { BlogData } from '../../../assets/dashboard';
import { FaEdit, FaTrash } from 'react-icons/fa';
import PrimaryButton from '../../../layouts/dashboard/PrimaryButton';
import CustomModal from '../../../models/CustomModal';
import DeleteConfirmationModal from '../../../models/DeleteConfirmationModal';
import ImageGenerator from '../../../models/dashboard/ImageGenerator';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import axios from 'axios';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', img: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleButtonClick = async () => {
    setIsLoading(true);
    try {
      // Make the API request directly in the parent component
      const response = await axios.post('http://127.0.0.1:5000/improve-text', {
        text: editForm.description,
      });
      //setImprovedText(response.data.corrected_text); // Set the improved text
      setEditForm({ ...editForm, description: response.data.corrected_text }); // Update the description field
    } catch (error) {
      console.error('Error improving text:', error);
     // setImprovedText('Error processing text');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/blogs', {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setBlogs(data);
        //console.log(data.img);

      } catch (error) {
        console.error('An error occurred while fetching blog data:', error);
      }
    };
    fetchData();
  }, []);



  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
  };

  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      const updatedBlogs = blogs.filter((_, i) => i !== deleteIndex);
      setBlogs(updatedBlogs);
      setDeleteIndex(null);
    }
  };


  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditForm(blogs[index]);
    setImageSrc('');  // Reset AI image when editing an existing blog
  };

  const handleSave = async () => {
    const { title, description, img } = editForm;
    const token = localStorage.getItem('token');
  
    // Validation: Check if any field is empty
    if (isAdding && (!title || !description || !img)) {
      alert('All fields (Title, Description, Image) must be filled out.');
      return;
    }
  
    if (!isAdding && (!title || !description)) {
      alert('All fields (Title, Description) must be filled out.');
      return;
    }
  
    try {
      let imageUrl = img;
    
      // Check if a new image is selected (base64 string starts with "data:image")
      if (img.startsWith('data:image')) {
        const formData = new FormData();
        const blob = await fetch(img).then(res => res.blob());
        formData.append('image', blob, 'image.png'); // Append the image file with a filename
    
        // Append the blog data to the formData
        formData.append('title', title);
        formData.append('description', description);
    
        let response;
        if (isAdding) {
          // Creating a new blog
          response = await fetch('http://localhost:8000/api/blogs', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          });
          const newBlog = await response.json();
          setBlogs([...blogs, newBlog]);
          setIsAdding(false);
        } else {
          // Updating an existing blog
          response = await fetch(`http://localhost:8000/api/blogs/${blogs[editingIndex].id}`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          });
          const updatedBlog = await response.json();
          const updatedBlogs = [...blogs];
          updatedBlogs[editingIndex] = updatedBlog;
          setBlogs(updatedBlogs);
          setEditingIndex(null);
        }
      } else {
        // If no new image is selected, just send the blog data
        const blogData = { title, description, image: imageUrl };
    
        let response;
        if (isAdding) {
          // Creating a new blog
          response = await fetch('http://localhost:8000/api/blogs', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(blogData),
          });
          const newBlog = await response.json();
          setBlogs([...blogs, newBlog]);
          setIsAdding(false);
        } else {
          // Updating an existing blog
          response = await fetch(`http://localhost:8000/api/blogs/${blogs[editingIndex].id}`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(blogData),
          });
          const updatedBlog = await response.json();
          const updatedBlogs = [...blogs];
          updatedBlogs[editingIndex] = updatedBlog;
          setBlogs(updatedBlogs);
          setEditingIndex(null);
        }
      }
      setEditForm({ title: '', description: '', img: '' });
    } catch (error) {
      console.error('An error occurred while saving the blog:', error);
    }
  };
  
  
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };


  // Handle image change from device and reset AI-generated image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditForm({ ...editForm, img: reader.result });
      setImageSrc(''); // Clear AI-generated image when a file is uploaded
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditForm({ title: '', description: '', img: '' });
    setImageSrc(''); 
  };

  const handleDelete = (index) => {
    const updatedBlogs = blogs.filter((_, i) => i !== index);
    setBlogs(updatedBlogs);
  };
 // Handle AI-generated image and reset the image from the device
 const handleAIImageSet = (generatedImage) => {
  setImageSrc(generatedImage);
  setEditForm({ ...editForm, img: '' }); // Clear the image from the device when AI image is set
};
  return (
    <div>
      <div className='flex justify-between'>
        <h1 className="text-2xl font-semibold text-center text-textColor">BLOGS</h1>
        <button onClick={handleAdd}>
          <PrimaryButton title="Add a New Blog" bgColor="bg-primaryColor hover:bg-hoverColor" />
        </button>
      </div>
      {blogs.map((blog, index) => {
          const descriptionParagraphs = (blog.description || '').split('\n');

        return (
          <div key={index} className="flex flex-col mb-5">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold mb-4 text-textColor dark:text-white">
                {blog.title}
              </h1>
              <div className="flex space-x-2">
              <div className="flex space-x-2">
          <FaEdit className="text-textColor dark:text-white cursor-pointer" onClick={() => handleEdit(index)} />
          <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDeleteClick(index)} />
        </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <img
                className="w-[400px] h-60 md:h-72 rounded-xl"
                src={blog.image}
                alt="Blog"
              />
              <div className="text-lg md:ml-5 text-textColor overflow-auto border-b-2 max-h-72 md:max-h-96 dark:text-gray-200">
                {descriptionParagraphs.map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      <CustomModal
        isOpen={editingIndex !== null || isAdding}
        onRequestClose={() => {
          setEditingIndex(null);
          setIsAdding(false);
        }}
      >
        <h2 className="text-xl font-bold mb-4">{isAdding ? 'Add New Blog' : 'Edit Blog'}</h2>
        <input
          className="border p-2 w-full mb-4"
          type="text"
          name="title"
          value={editForm.title}
          onChange={handleChange}
          placeholder="Title"
        />
       <div className='relative'>
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
       class="group flex justify-center p-2 rounded-md hover:text-black drop-shadow-xl from-gray-800 bg-[#a6a7ab] text-white font-semibold hover:translate-y-2 transition-all duration-250 hover:from-[#331029] hover:to-[#310413]"
       variant="ghost"
       size="icon"
     >
       {isLoading ? ( <FaWandMagicSparkles className="animate-spin" />) : (   <FaWandMagicSparkles />)}
       <span
      class="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-md group-hover:-translate-y-12 duration-500"
    >
     Improve
    </span>
     </button>
      </div>
        </div>
         <label className="block mb-2 text-gray-400">{isAdding ? 'Choose image from Device ' : 'Change image from Device'}</label>
        <input
          className="border p-2 w-full mb-4"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
         <div className="mb-5">
         <ImageGenerator setImageSrc={handleAIImageSet} />
         {imageSrc && (
  <div className="md:ml-24 md:mr-24  ml-10 mr-10  scale-90  border border-gray-300 rounded-xl overflow-hidden flex justify-center items-center ">
    <img src={imageSrc} alt="Generated" className="object-cover w-full h-full" />
  </div>
)}

    </div>
        {editForm.img && <img className="w-[400px] h-60 rounded-xl mb-4" src={editForm.img} alt="Preview" />}
    
          <button onClick={handleSave} className='bg-primaryColor hover:bg-hoverColor text-white px-4 py-2 rounded-md transition duration-300 w-full mb-4'>
          Save
          </button>
       
      </CustomModal>
      <DeleteConfirmationModal
        isOpen={deleteIndex !== null}
        onRequestClose={() => setDeleteIndex(null)}
        title='the Blog'
        itemName={deleteIndex !== null ? blogs[deleteIndex].title : ''}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default Blog;