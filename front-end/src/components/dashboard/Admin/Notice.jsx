import React, { useState } from 'react';
import { noticeInfo as initialNotices } from '../../../assets/dashboard';
import { FaEdit } from 'react-icons/fa';

const NoticeInfoDisplay = () => {
  const [notices, setNotices] = useState(initialNotices);
  const [newNotice, setNewNotice] = useState({ quote: '', name: '', title: '', vanishDate: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotice({ ...newNotice, [name]: value });
  };

  const addOrEditNotice = () => {
    if (newNotice.quote && newNotice.name && newNotice.title) {
      if (isEditing) {
        const updatedNotices = notices.map((notice, index) =>
          index === editIndex ? newNotice : notice
        );
        setNotices(updatedNotices);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        setNotices([...notices, newNotice]);
      }
      setNewNotice({ quote: '', name: '', title: '', vanishDate: '' }); // Reset form
    }
  };

  const editNotice = (index) => {
    setNewNotice(notices[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const deleteNotice = (index) => {
    const updatedNotices = notices.filter((_, i) => i !== index);
    setNotices(updatedNotices);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Notice' : 'Add a New Notice'}</h2>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <textarea
            name="quote"
            value={newNotice.quote}
            onChange={handleInputChange}
            placeholder="Quote"
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            name="name"
            type="text"
            value={newNotice.name}
            onChange={handleInputChange}
            placeholder="Name"
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
          <input
            name="vanishDate"
            className="p-2 border border-gray-300 rounded-md"
            type="text"
            value={newNotice.vanishDate}
            onFocus={(e) => (e.currentTarget.type = 'date')}
            onBlur={(e) => (e.currentTarget.type = 'text')}
            onChange={handleInputChange}
            placeholder="Vanish Date"
          />
        </div>
        <button
          onClick={addOrEditNotice}
          className="px-4 py-2 bg-primaryColor text-white rounded-md hover:bg-hoverColor transition duration-300"
        >
          {isEditing ? 'Save Changes' : 'Add Notice'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {notices.map((item, index) => (
          <div key={index} className="relative p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
            <p className="text-gray-700 mb-4">{item.quote}</p>
            <h4 className="text-lg font-bold text-primaryColor">{item.name}</h4>
            <h5 className="text-md text-gray-500 italic">{item.title}</h5>
            <p className="text-sm text-gray-400">Vanish Date: {item.vanishDate}</p>
            <div className="absolute top-2 right-2 flex space-x-2">
              <button
                onClick={() => editNotice(index)}
                className="text-gray-500 hover:text-blue-700"
              >
               <FaEdit/>
              </button>
              <button
                onClick={() => deleteNotice(index)}
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
    </div>
  );
};

export default NoticeInfoDisplay;
