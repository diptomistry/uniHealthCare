import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Replace with actual token retrieval from localStorage
  const token = localStorage.getItem('token'); // Example, ensure the token exists

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/chat/rooms/1/messages?size=30', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(response.data.content);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [token]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4 mt-4">
      <div className="bg-white shadow-md rounded-lg p-4 max-h-[70vh] overflow-y-auto"> {/* Set max height and scrolling */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 p-2 max-w-[40%] ${
              message.sender === 1 ? 'bg-secondaryColor text-white self-end ml-auto mr-4 rounded-l-xl rounded-tr-xl' : 'bg-gray-200 text-black self-start rounded-r-md rounded-tl-md'
            }`}
          >
            <p>{message.content}</p>
            <small className="block text-xs mt-2 text-gray-400">
              {new Date(message.timestamp).toLocaleTimeString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetMessages;
