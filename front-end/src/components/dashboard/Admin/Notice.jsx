import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaEdit } from 'react-icons/fa';
import DeleteConfirmationModal from '../../../models/DeleteConfirmationModal';
//import { noticeInfo } from '../../../assets/dashboard';

const NoticeInfoDisplay = () => {
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState({ description: '', title: '', date: null });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const editFieldRef = useRef(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('http://localhost:8000/api/notices', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch notices');
        }

        const data = await response.json();
        setNotices(data);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotice({ ...newNotice, [name]: value });
  };

  const handleDateChange = (date) => {
    setNewNotice({ ...newNotice, date });
  };

  const addOrEditNotice = async () => {
    const token = localStorage.getItem('token');

    if (newNotice.description && newNotice.title && newNotice.date) {
      try {
        const url = isEditing
          ? `http://localhost:8000/api/notices/${notices[editIndex].noticeID}`
          : 'http://localhost:8000/api/notices';

        const method = isEditing ? 'PUT' : 'POST';

        const response = await fetch(url, {
          method,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newNotice),
        });

        if (!response.ok) {
          throw new Error('Failed to save notice');
        }

        const savedNotice = await response.json();

        if (isEditing) {
          const updatedNotices = notices.map((notice, index) =>
            index === editIndex ? savedNotice : notice
          );
          setNotices(updatedNotices);
          setIsEditing(false);
          setEditIndex(null);
        } else {
          setNotices([...notices, savedNotice]);
        }

        setNewNotice({ description: '', title: '', date: null });
      } catch (error) {
        console.error('Error saving notice:', error);
      }
    }
  };

  const editNotice = (index) => {
    setNewNotice({
      description: notices[index].description,
      title: notices[index].title,
      date: new Date(notices[index].date),
    });
    setIsEditing(true);
    setEditIndex(index);
    if (editFieldRef.current) {
      const yOffset = -80;
      const yPosition = editFieldRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: yPosition, behavior: 'smooth' });
    }
  };

  const openDeleteModal = (index) => {
    setDeleteIndex(index);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteIndex(null);
  };

  const confirmDelete = async () => {
    if (deleteIndex !== null) {
      const token = localStorage.getItem('token');
      const noticeID = notices[deleteIndex].noticeID;

      try {
        const response = await fetch(`http://localhost:8000/api/notices/${noticeID}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete notice');
        }

        const updatedNotices = notices.filter((_, i) => i !== deleteIndex);
        setNotices(updatedNotices);
        closeDeleteModal();
      } catch (error) {
        console.error('Error deleting notice:', error);
      }
    }
  };

  return (
    <div>
      <div ref={editFieldRef} className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {isEditing ? 'Edit Notice' : 'Add a New Notice'}
        </h2>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <textarea
            name="description"
            value={newNotice.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            name="title"
            type="text"
            value={newNotice.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="p-2 border border-gray-300 rounded-md"
          />
          <DatePicker
            selected={newNotice.date}
            onChange={handleDateChange}
            placeholderText="Date"
            className="p-2 border border-gray-300 rounded-md w-full"
            dateFormat="MMMM d, yyyy"
          />
        </div>
        <button
          onClick={addOrEditNotice}
          className="px-4 py-2 bg-primaryColor text-white rounded-md hover:bg-hoverColor transition duration-300"
        >
          {isEditing ? 'Save Changes' : 'Add Notice'}
        </button>
      </div>
      <h1 className="text-2xl text-gray-700 font-semibold mb-4">Current Notices</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {notices.map((item, index) => (
          <div key={index} className="relative p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
            <p className="text-gray-700 mb-4">{item.description}</p>
            <h5 className="text-md font-semibold text-gray-500 italic">{item.title}</h5>
            <p className="text-sm text-gray-400">
              Date: {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}
            </p>
            <div className="absolute top-2 right-2 flex space-x-2">
              <button
                onClick={() => editNotice(index)}
                className="text-backgroundColor hover:text-hoverColor"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => openDeleteModal(index)}
                className="text-red-500 hover:text-red-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        itemName={deleteIndex !== null ? notices[deleteIndex].title : ''}
        title="the Notice"
        onConfirmDelete={confirmDelete}
      />
    </div>
  );
};

export default NoticeInfoDisplay;
