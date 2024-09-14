import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessageIconTemplate = () => {
  const [socket, setSocket] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatRoomId, setChatRoomId] = useState(1); // Example chat room ID

  useEffect(() => {
    if (modalOpen) {
      fetchPreviousMessages();
      connectWebSocket();
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [modalOpen]);

  const fetchPreviousMessages = async () => {
    try {
      const response = await axios.get(`/api/chat/rooms/${chatRoomId}/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching previous messages:', error);
    }
  };

  const showMessage = (message) => {
    console.log('Received message: ', message);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const connectWebSocket = () => {
    const newSocket = new WebSocket('ws://localhost:8000/ws/chat');
    newSocket.onopen = () => {
      console.log('WebSocket connection established');
    };
    newSocket.onmessage = (event) => {
      showMessage(event.data);
    };
    newSocket.onclose = () => {
      console.log('WebSocket connection closed');
    };
    newSocket.onerror = (error) => {
      console.error('WebSocket error: ', error);
    };
    setSocket(newSocket);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    if (socket) {
      socket.close();
    }
  };

  const handleSendMessage = () => {
    if (socket && newMessage.trim() !== '') {
      socket.send(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={openModal}>Open Chat</button>
{modalOpen && (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Chat</h2>
        <button className="text-gray-500 hover:text-gray-700" onClick={closeModal}>&times;</button>
      </div>
      <div className="p-4 flex flex-col h-96">
        {Array.isArray(messages) && messages.length > 0 && (
          <div className="flex-1 overflow-y-auto mb-4">
            {messages.map((msg, index) => (
              <div key={index} className="p-2 bg-gray-100 rounded mb-2">{msg}</div>
            ))}
          </div>
        )}
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-l"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default MessageIconTemplate;