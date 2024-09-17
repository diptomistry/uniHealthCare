import React from "react";

const ChatMessage = ({ message, username }) => {
  const isOwnMessage = message.sender === username;
  const messageClass = isOwnMessage ? "bg-blue-100" : "bg-gray-100";

  return (
    <li className={`p-2 rounded ${messageClass}`}>
      {message.type === "JOIN" && (
        <p className="text-green-500">{message.sender} joined!</p>
      )}
      {message.type === "LEAVE" && (
        <p className="text-red-500">{message.sender} left!</p>
      )}
      {message.type === "CHAT" && (
        <div>
          <span className="font-bold">{message.sender}</span>: {message.content}
        </div>
      )}
    </li>
  );
};

export default ChatMessage;