import React, { useState, useContext, useEffect, useRef } from "react";
import { LuMessageSquarePlus, LuSend } from "react-icons/lu";
import CustomModal from "../../models/CustomModal";
import { UserContext } from "../../services/auth/UserProvider";
import GetMessages from "./GetMessages";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const MessageIconTemplate = ({ receiverID, receiverName, receiverImage }) => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [roomID, setRoomID] = useState(null);

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  const openModal = async () => {
    setModalOpen(true);

    try {
      console.log("Creating chat room...", user.userID, receiverID);
      const response = await fetch("http://localhost:8000/api/chat/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify([user.userID, receiverID]),
      });

      if (response.ok) {
        const data = await response.json();
        setRoomID(data.id);
        console.log("Chat room created:", data);
      } else {
        throw new Error("Failed to create chat room");
      }
    } catch (error) {
      console.error("Error creating chat room:", error);
    }
  };

  const sendMessage = async () => {
    if (!message || !roomID) return;
    console.log("Sending message:", message, user.userID);

    try {
      const response = await fetch(
        `http://localhost:8000/api/chat/rooms/${roomID}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ senderId: user.userID, content: message }),
        }
      );

      if (response.ok) {
        setMessage("");
        console.log("Message sent successfully");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="text-backgroundColor hover:text-hoverColor transition-colors duration-300"
      >
        <LuMessageSquarePlus className="w-5 h-5" />
      </button>
      {isModalOpen && (
        <CustomModal
          isOpen={isModalOpen}
          onRequestClose={() => setModalOpen(false)}
        >
          <div className="flex flex-col h-full">
            <div className="sticky top-0 bg-gray-100 mt-2 ml-4 mr-4 rounded-t-xl shadow-md dark:bg-gray-800 z-10 p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                {!receiverImage ? (
                  <img
                    src={receiverImage}
                    alt={receiverName}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                    <span className="text-xl font-semibold">
                      {getInitial(receiverName)}
                    </span>
                  </div>
                )}
                <h2 className="text-xl font-semibold">{receiverName}</h2>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto">
              {roomID && (
                <GetMessages
                  roomID={roomID}
                  receiverName={receiverName}
                  receiverImage={receiverImage}
                />
              )}
            </div>

            <div className="sticky bottom-0 rounded-xl  bg-gray-100 dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center ">
                <textarea
                  value={message}
                  onChange={handleInputChange}
                  rows={1}
                  className="flex-grow p-2 rounded-lg border border-gray-300 dark:bg-gray-600 dark:text-white dark:border-gray-500 resize-none overflow-hidden"
                  placeholder="Type your message..."
                  style={{ height: "auto", minHeight: "40px" }}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                />
                <button
                  onClick={sendMessage}
                  className="ml-2 p-2 rounded-full bg-brightColor text-white"
                >
                  <LuSend />
                </button>
              </div>
            </div>
          </div>
        </CustomModal>
      )}
    </>
  );
};

export default MessageIconTemplate;
