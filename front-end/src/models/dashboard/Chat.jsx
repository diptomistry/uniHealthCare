import React, { useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import Button from '../../layouts/dashboard/Button';
import { chatData } from '../../assets/dashboard';
import CustomModal from '../CustomModal';
import { LuSend } from "react-icons/lu";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedChat(null);
  };

  const mergeAndSortMessages = (messages, replies) => {
    const combined = [...messages, ...replies].sort((a, b) => {
      const timeA = new Date(`1970/01/01 ${a.time}`);
      const timeB = new Date(`1970/01/01 ${b.time}`);
      return timeA - timeB;
    });
    return combined;
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const updatedChat = {
        ...selectedChat,
        replies: [
          ...selectedChat.replies,
          { text: newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]
      };
      setSelectedChat(updatedChat);
      setNewMessage('');
    }
  };

  return (
    <div className="nav-item absolute right-5 md:right-52 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">Messages</p>
          <button type="button" className="text-gray-600 text-xs rounded-2xl p-1 px-2 bg-orange-400">
            5 New
          </button>
        </div>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="mt-5 overflow-y-auto max-h-[60vh]">
        {chatData?.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-5 border-b-2 p-3 leading-8 cursor-pointer"
            onClick={() => handleChatClick(item)}
          >
            <div className="relative">
              <img
                className="rounded-full h-10 w-10"
                src={item.image}
                alt={item.name}
              />
              <span
                style={{ background: item.dotColor }}
                className="absolute inline-flex rounded-full h-2 w-2 right-0 -top-1"
              />
            </div>
            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.name}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {item.messages[item.messages.length - 1].text}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">{item.messages[item.messages.length - 1].time}</p>
            </div>
          </div>
        ))}
    
      </div>

      {selectedChat && (
        <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
          <div className="p-4 flex flex-col">
            <h2 className="font-bold  text-xl mb-4">{selectedChat.name}</h2>
            <div className="overflow-y-auto max-h-[60vh] flex-grow">
              {mergeAndSortMessages(selectedChat.messages, selectedChat.replies).map((item, index) => (
                <div 
                  key={index} 
                  className={`mb-2 flex ${selectedChat.replies.includes(item) ? 'justify-end' : ''}`}
                >
                  {!selectedChat.replies.includes(item) && (
                    <img
                      src={selectedChat.image}
                      alt={selectedChat.name}
                      className="rounded-full h-8 w-8 mr-2"
                    />
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg p-2 ${
                      selectedChat.replies.includes(item)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white'
                    }`}
                  >
                    <p className="text-sm">{item.text}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-600 text-right">
                      {item.time}
                    </p>
                  </div>
               
                </div>
              ))}
            </div>
            <div className="flex items-center mt-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow p-2 rounded-lg border border-gray-300 dark:bg-gray-600 dark:text-white dark:border-gray-500"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 p-2 rounded-full bg-brightColor text-white"
              >
                <LuSend />
              </button>
            </div>
          </div>
        </CustomModal>
      )}
    </div>
  );
};

export default Chat;
