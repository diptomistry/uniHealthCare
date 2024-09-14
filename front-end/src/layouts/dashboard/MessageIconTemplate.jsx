import React, { useState, useContext } from 'react';
import { LuMessageSquarePlus, LuSend } from 'react-icons/lu';
import CustomModal from '../../models/CustomModal';
import { UserContext } from '../../services/auth/UserProvider';
import GetMessages from './GetMessages';

const MessageIconTemplate = ({ receiverID }) => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [roomID, setRoomID] = useState(null);

  const openModal = async () => {
    setModalOpen(true);
console.log('receiverID',receiverID);
console.log('user.userID',user.userID);
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
        setRoomID(data.id); // Assuming the response contains roomID
        console.log('Chat room created:', data);
      } else {
        throw new Error('Failed to create chat room');
      }
    } catch (error) {
      console.error('Error creating chat room:', error);
    }
  };

  const sendMessage = async () => {
    if (!message || !roomID) return;
    console.log('Sending message:', message, user.userID);

    try {
      const response = await fetch(`http://localhost:8000/api/chat/rooms/${roomID}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ senderId: user.userID, content: message }),
      });

      if (response.ok) {
        setMessage(''); // Clear message input after sending
        console.log('Message sent successfully');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <button onClick={openModal} className="text-backgroundColor hover:text-hoverColor transition-colors duration-300">
        <LuMessageSquarePlus className="w-5 h-5" />
      </button>
      {isModalOpen && (
        <CustomModal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)}>
          {roomID && <GetMessages roomID={roomID} />}

          <div className="flex items-center pb-10 p-4">
            <textarea
              value={message}
              onChange={handleInputChange}
              rows={1} // Start with 1 row
              className="flex-grow p-2 rounded-lg border border-gray-300 dark:bg-gray-600 dark:text-white dark:border-gray-500 resize-none overflow-hidden"
              placeholder="Type your message..."
              style={{ height: 'auto', minHeight: '40px' }} // Initial height
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }} // Dynamically resize
            />
            <button onClick={sendMessage} className="ml-2 p-2 rounded-full bg-brightColor text-white">
              <LuSend />
            </button>
          </div>
        </CustomModal>
      )}
    </>
  );
};

export default MessageIconTemplate;
