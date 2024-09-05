import React, { useState,useContext } from 'react';
import { LuMessageSquarePlus } from 'react-icons/lu';
import CustomModal from '../../models/CustomModal';
import { UserContext } from '../../services/auth/UserProvider';
const MessageIconTemplate = ({ receiverID }) => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [roomID, setRoomID] = useState(null);

  const openModal = async () => {
    setModalOpen(true);
    // Check or create chat room when modal opens
    try {
      const response = await fetch('http://localhost:8000/api/chat/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify([user.userID, receiverID]),
      });

      if (response.ok) {
        const data = await response.json();
        setRoomID(data.roomID); // Assuming the response contains roomID
      } else {
        throw new Error('Failed to create chat room');
      }
    } catch (error) {
      console.error('Error creating chat room:', error);
    }
  };

  const sendMessage = async () => {
    if (!message || !roomID) return;

    try {
      const response = await fetch(`http://localhost:8000/api/chat/rooms/${roomID}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ message, senderID: user.userID }),
      });

      if (response.ok) {
        setMessage(''); // Clear message input after sending
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
      <button onClick={openModal} className="text-backgroundColor hover:text-hoverColor transition-colors duration-300">
        <LuMessageSquarePlus className="w-5 h-5" />
      </button>
      {isModalOpen && (
        <CustomModal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)}>
          <h2 className="text-lg font-bold mb-4">Chat</h2>
          <div className="mb-4">
            {/* Message input */}
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
            Send
          </button>
        </CustomModal>
      )}
    </>
  );
};

export default MessageIconTemplate;
