import React, { useState } from 'react';
import { BlogData } from '../../../assets/dashboard';
import { FaEdit, FaTrash } from 'react-icons/fa';
import PrimaryButton from '../../../layouts/dashboard/PrimaryButton';
import CustomModal from '../../../models/CustomModal';
import DeleteConfirmationModal from '../../../models/DeleteConfirmationModal';

const Blog = () => {
  const [blogs, setBlogs] = useState(BlogData);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', img: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

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
  };

  const handleSave = () => {
    const { title, description, img } = editForm;

    // Validation: Check if any field is empty
    if (!title || !description || !img) {
      alert('All fields (Title, Description, Image) must be filled out.');
      return;
    }

    if (isAdding) {
      setBlogs([...blogs, editForm]);
      setIsAdding(false);
    } else {
      const updatedBlogs = [...blogs];
      updatedBlogs[editingIndex] = editForm;
      setBlogs(updatedBlogs);
      setEditingIndex(null);
    }
    setEditForm({ title: '', description: '', img: '' });
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

  const handleAdd = () => {
    setIsAdding(true);
    setEditForm({ title: '', description: '', img: '' });
  };

  const handleDelete = (index) => {
    const updatedBlogs = blogs.filter((_, i) => i !== index);
    setBlogs(updatedBlogs);
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
        const descriptionParagraphs = blog.description.split('\n');

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
                src={blog.img}
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
        <textarea
          className="border p-2 w-full mb-4"
          name="description"
          value={editForm.description}
          onChange={handleChange}
          placeholder="Description"
          rows={5}
        />
        <label className="block mb-2 text-gray-400">{isAdding ? 'Choose image' : 'Change image'}</label>
        <input
          className="border p-2 w-full mb-4"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {editForm.img && <img className="w-[400px] h-60 rounded-xl mb-4" src={editForm.img} alt="Preview" />}
        <div className="flex justify-end">
          <button onClick={handleSave}>
            <PrimaryButton title="Save" bgColor="bg-primaryColor hover:bg-hoverColor" />
          </button>
        </div>
      </CustomModal>
      <DeleteConfirmationModal
        isOpen={deleteIndex !== null}
        onRequestClose={() => setDeleteIndex(null)}
        itemName={deleteIndex !== null ? blogs[deleteIndex].title : ''}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default Blog;
