import React, { useState } from 'react';
import { noticeInfo as initialNotices } from '../../../assets/dashboard';

const NoticeInfoDisplay = () => {
  const [notices, setNotices] = useState(initialNotices);
  const [newNotice, setNewNotice] = useState({ quote: '', name: '', title: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotice({ ...newNotice, [name]: value });
  };

  const addNewNotice = () => {
    if (newNotice.quote && newNotice.name && newNotice.title) {
      setNotices([...notices, newNotice]);
      setNewNotice({ quote: '', name: '', title: '' }); // Reset form
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Add a New Notice</h2>
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
                onFocus={(e) => (e.currentTarget.type = "date")}
                onBlur={(e) => (e.currentTarget.type = "text")}
                onChange={handleInputChange}
                placeholder="Vanish Date"
              ></input>
        </div>
        <button
          onClick={addNewNotice}
          className="px-4 py-2 bg-primaryColor text-white rounded-md hover:bg-hoverColor transition duration-300"
        >
          Add Notice
        </button>
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {notices.map((item, index) => (
          <div key={index} className="p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
            <p className="text-gray-700 mb-4">{item.quote}</p>
            <h4 className="text-lg font-bold text-primaryColor">{item.name}</h4>
            <h5 className="text-md text-gray-500 italic">{item.title}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeInfoDisplay;
