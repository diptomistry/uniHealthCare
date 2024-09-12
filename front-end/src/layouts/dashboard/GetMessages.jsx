import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../services/auth/UserProvider'; // Adjust the import path as needed

const GetMessages = ({ roomID, receiverName, receiverImage }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!roomID) return;

    const fetchMessages = async () => {
      try {
        console.log(roomID);
        const response = await axios.get(`http://localhost:8000/api/chat/rooms/${roomID}/messages?size=30`, {
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
  }, [roomID, token]);

  if (loading) {
    return <p className="text-center py-4">Loading...</p>;
  }

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  const formatTimestamp = (timestamp) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    
    if (messageDate.toDateString() === today.toDateString()) {
      // If the message is from today, return only the time
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      // If the message is not from today, return the date
      return messageDate.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="container mx-auto pl-4 pr-4 ">
      <div className="bg-gray-200 dark:bg-gray-800 p-4 max-h-[60vh] overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start mb-4 ${
              message.sender === user.userID ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.sender !== user.userID && (
              <div className="flex-shrink-0 mr-3">
                {!receiverImage ? (
                  <img src={receiverImage} alt={receiverName} className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-sm font-semibold">{getInitial(receiverName)}</span>
                  </div>
                )}
              </div>
            )}
            <div
              className={`p-3 rounded-lg max-w-[70%] ${
                message.sender === user.userID
                  ? 'bg-brightColor text-white rounded-br-none'
                  : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none'
              }`}
            >
              <p className="break-words">{message.content}</p>
              <small className="block text-xs mt-1 opacity-70">
                {formatTimestamp(message.timestamp)}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetMessages;
