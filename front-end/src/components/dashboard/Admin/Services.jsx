// import React, { useState,useEffect } from 'react';

// import CustomModal from '../../../models/CustomModal';
// import DeleteConfirmationModal from '../../../models/DeleteConfirmationModal';
// import ImageGenerator from '../../../models/dashboard/ImageGenerator';
// import { FaWandMagicSparkles } from 'react-icons/fa6';
// import BlogPostSlider from '../../../models/dashboard/BlogPostSlider';
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8000/api';
// const Services = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [editForm, setEditForm] = useState({ title: '', description: '', img: '' });
//   const [isAdding, setIsAdding] = useState(false);
//   const [deleteIndex, setDeleteIndex] = useState(null);
//   const [imageSrc, setImageSrc] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isLoadingImg, setIsLoadingImg] = useState(false);
//   const handleButtonClick = async () => {
//     setIsLoading(true);
//     try {
//       // Make the API request directly in the parent component
//       const response = await axios.post('http://127.0.0.1:5001/improve-text', {
//         text: editForm.description,
//       });
//       //setImprovedText(response.data.corrected_text); // Set the improved text
//       setEditForm({ ...editForm, description: response.data.corrected_text }); // Update the description field
//     } catch (error) {
//       console.error('Error improving text:', error);
//      // setImprovedText('Error processing text');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/api/blogs', {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await response.json();
//         const filteredBlogs = data.filter(blog => blog.isBlog === false);

//         setBlogs(filteredBlogs);
//         //console.log(data.img);

//       } catch (error) {
//         console.error('An error occurred while fetching blog data:', error);
//       }
//     };
//     fetchData();
//   }, []);



//   const handleDeleteClick = (index) => {
//     setDeleteIndex(index);
//   };

//   const handleConfirmDelete = () => {
//     if (deleteIndex !== null) {
//       handleDelete(blogs[deleteIndex].id);
//       const updatedBlogs = blogs.filter((_, i) => i !== deleteIndex);
//       setBlogs(updatedBlogs);
//       setDeleteIndex(null);
//     }
//   };


//   const handleEdit = (index) => {
//     setEditingIndex(index);
//     setEditForm(blogs[index]);
//     setImageSrc('');  // Reset AI image when editing an existing blog
//   };

//   const handleSave = async () => {
//     if (!editForm.title || !editForm.description) {
//       alert('Title and Description are required.');
//       return;
//     }
  
//     const token = localStorage.getItem('token');
//     const formData = new FormData();
//     formData.append('title', editForm.title);
//     formData.append('description', editForm.description);
 
  
//     if (editForm.img) {
//       // Check if img is a string (base64 URL)
//       if (typeof editForm.img === 'string' && editForm.img.startsWith('data:image')) {
//         // Convert base64 to blob
//         const response = await fetch(editForm.img);
//         const blob = await response.blob();
//         formData.append('file', blob, 'image.jpg');
       
//       }
//       // Check if img is a File or Blob
//       else if (editForm.img instanceof File || editForm.img instanceof Blob) {
//         formData.append('file', editForm.img);
//       }
//     }
  
//     try {
    

//       console.log('hello', editForm.img);
//       let response;
//       if (isAdding) {
//         response = await axios.post(`${API_BASE_URL}/blogs`, formData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         setBlogs([...blogs, response.data]);
//       } else {
//         response = await axios.put(`${API_BASE_URL}/blogs/${editForm.id}`, formData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         setBlogs(blogs.map((blog) => (blog.id === editForm.id ? response.data : blog)));
//       }
//       setEditingIndex(null);
//       setIsAdding(false);
//     } catch (error) {
//       console.error('Error saving blog:', error);
//       alert('Failed to save blog. Please try again.');
//     }
//   };
  


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditForm({ ...editForm, [name]: value });
//   };


//   // Handle image change from device and reset AI-generated image
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setEditForm({ ...editForm, img: reader.result });//
//       setImageSrc(''); // Clear AI-generated image when a file is uploaded
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleAdd = () => {
//     setIsAdding(true);
//     setEditForm({ title: '', description: '', img: '' });
//     setImageSrc(''); 
//   };

//   const handleDelete = async (blogId) => {
//     try {
//       const token = localStorage.getItem('token');
//     const response=  await axios.delete(`${API_BASE_URL}/blogs/${blogId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       // Update the local state after successful deletion
//       console.log(blogId);
//       console.log(response);

      
      
      
//     } catch (error) {
//       console.error('Error deleting blog:', error);
//       alert('Failed to delete the blog. Please try again.');
//     }
//   };

// const handleAIImageSet = async (generatedImage) => {
//   setImageSrc(generatedImage); // Display the image in the UI

//   try {
//     // Fetch the image from the URL
//     const response = await fetch(generatedImage);
//     const blob = await response.blob();  // Convert to Blob

//     // Update the form with the Blob
//     setEditForm({ ...editForm, img: blob });  // Save Blob in editForm.img
//   } catch (error) {
//     console.error("Error converting image to blob:", error);
//   }
// };

//   return (
//     <div>
//       <BlogPostSlider 
//   blogs={blogs}
//   handleEdit={handleEdit}
//   handleDeleteClick={handleDeleteClick}
//   handleAdd={handleAdd}
// />
//       <CustomModal
//         isOpen={editingIndex !== null || isAdding}
//         onRequestClose={() => {
//           setEditingIndex(null);
//           setIsAdding(false);
//         }}
//       >
//         <h2 className="text-xl font-bold mb-4">{isAdding ? 'Add New Service' : 'Edit Service'}</h2>
//         <input
//           className="border p-2 w-full mb-4"
//           type="text"
//           name="title"
//           value={editForm.title}
//           onChange={handleChange}
//           placeholder="Title"
//         />
//        <div className='relative'>
//         <textarea
//           className="border p-2 w-full mb-4 pr-12"
//           name="description"
//           value={editForm.description}
//           onChange={handleChange}
//           placeholder="Description"
//           rows={5}
//         />
//       <div className="absolute right-2 top-0 p-2">
//       <button 
//         onClick={handleButtonClick}
//         disabled={isLoading}
//        class="group flex justify-center p-2 rounded-md hover:text-black drop-shadow-xl from-gray-800 bg-[#a6a7ab] text-white font-semibold hover:translate-y-2 transition-all duration-250 hover:from-[#331029] hover:to-[#310413]"
//        variant="ghost"
//        size="icon"
//      >
//        {isLoading ? ( <FaWandMagicSparkles className="animate-spin" />) : (   <FaWandMagicSparkles />)}
//        <span
//       class="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-md group-hover:-translate-y-12 duration-500"
//     >
//      Improve
//     </span>
//      </button>
//       </div>
//         </div>
//          <label className="block mb-2 text-gray-400">{isAdding ? 'Choose image from Device ' : 'Change image from Device'}</label>
//         <input
//           className="border p-2 w-full mb-4"
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//         />
//          <div className="mb-5">
         
//          <ImageGenerator
//                      setImageSrc={handleAIImageSet}
//                      isLoading={isLoadingImg}
//                      setIsLoading={setIsLoadingImg}
//                    />
//          {imageSrc && (
//   <div className="md:ml-24 md:mr-24  ml-10 mr-10  scale-90  border border-gray-300 rounded-xl overflow-hidden flex justify-center items-center ">
//     <img src={imageSrc} alt="Generated" className="object-cover w-full h-full" />
//   </div>
// )}

//     </div>
//         {editForm.img && !imageSrc && <img className="w-[400px] h-60 rounded-xl mb-4" src={editForm.img} alt="Preview" />}
    
//           <button onClick={handleSave} className='bg-primaryColor hover:bg-hoverColor text-white px-4 py-2 rounded-md transition duration-300 w-full mb-4'>
//           Save
//           </button>
       
//       </CustomModal>
//       <DeleteConfirmationModal
//         isOpen={deleteIndex !== null}
//         onRequestClose={() => setDeleteIndex(null)}
//         title='Delete Service'
//         itemName={blogs[deleteIndex]?.title || ''}
//         onConfirmDelete={handleConfirmDelete}
//       />
//     </div>
//   );
// };

// export default Services ;
import React from 'react'
import ContentManager from './ContentManager'

const Services = () => {
  return (
    <div><ContentManager 
    contentType="service"
    title="SERVICES"
  /></div>
  )
}

export default Services