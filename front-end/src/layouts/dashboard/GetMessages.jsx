// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { UserContext } from '../../services/auth/UserProvider'; // Adjust the import path as needed

// const GetMessages = ({ roomID, receiverName, receiverImage }) => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { user } = useContext(UserContext);

//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (!roomID) return;

//     const fetchMessages = async () => {
//       try {
//         console.log(roomID);
//         const response = await axios.get(`http://localhost:8000/api/chat/rooms/${roomID}/messages?size=30`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setMessages(response.data.content);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//         setLoading(false);
//       }
//     };

//     fetchMessages();
//   }, [roomID, token]);

//   if (loading) {
//     return <p className="text-center py-4">Loading...</p>;
//   }

//   const getInitial = (name) => {
//     return name ? name.charAt(0).toUpperCase() : '';
//   };

//   const formatTimestamp = (timestamp) => {
//     const messageDate = new Date(timestamp);
//     const today = new Date();
    
//     if (messageDate.toDateString() === today.toDateString()) {
//       // If the message is from today, return only the time
//       return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     } else {
//       // If the message is not from today, return the date
//       return messageDate.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
//     }
//   };

//   return (
//     <div className="container mx-auto pl-4 pr-4 ">
//       <div className="bg-gray-200 dark:bg-gray-800 p-4 max-h-[60vh] overflow-y-auto">
//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className={`flex items-start mb-4 ${
//               message.sender === user.userID ? 'justify-end' : 'justify-start'
//             }`}
//           >
//             {message.sender !== user.userID && (
//               <div className="flex-shrink-0 mr-3">
//                 {!receiverImage ? (
//                   <img src={receiverImage} alt={receiverName} className="w-8 h-8 rounded-full" />
//                 ) : (
//                   <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
//                     <span className="text-sm font-semibold">{getInitial(receiverName)}</span>
//                   </div>
//                 )}
//               </div>
//             )}
//             <div
//               className={`p-3 rounded-lg max-w-[70%] ${
//                 message.sender === user.userID
//                   ? 'bg-brightColor text-white rounded-br-none'
//                   : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none'
//               }`}
//             >
//               <p className="break-words">{message.content}</p>
//               <small className="block text-xs mt-1 opacity-70">
//                 {formatTimestamp(message.timestamp)}
//               </small>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GetMessages;

// /*
// import React from 'react';

// const GetMessages = ({ messages }) => {
//   if (!messages || messages.length === 0) {
//     return <p>No messages yet.</p>;
//   }

//   return (
//     <div className="container mx-auto p-4 mt-4">
//       <div className="bg-white shadow-md rounded-lg p-4 max-h-[70vh] overflow-y-auto"> 
//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className={`mb-4 p-2 max-w-[40%] ${
//               message.sender === 1 ? 'bg-secondaryColor text-white self-end ml-auto mr-4 rounded-l-xl rounded-tr-xl' : 'bg-gray-200 text-black self-start rounded-r-md rounded-tl-md'
//             }`}
//           >
//             <p>{message.content}</p>
//             <small className="block text-xs mt-2 text-gray-400">
//               {new Date(message.timestamp).toLocaleTimeString()}
//             </small>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GetMessages;
// */
import React, { useEffect, useState, useRef } from "react";

const GetMessages = ({ roomID, receiverName, receiverImage, messages }) => {
  const [pastMessages, setPastMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Fetch past messages when the component is mounted
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/chat/rooms/${roomID}/messages`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setPastMessages(data);
        } else {
          throw new Error("Failed to fetch messages");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (roomID) {
      fetchMessages();
    }
  }, [roomID]);

  // Scroll to the bottom of the message list whenever new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, pastMessages]);

  return (
    <div className="p-4 overflow-y-auto h-96">
      {pastMessages.length > 0 &&
        pastMessages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.senderId === roomID ? 'justify-start' : 'justify-end'}`}>
            <div className="p-2 bg-gray-200 rounded-lg max-w-xs mb-2">
              <span className="block font-medium">{msg.content}</span>
            </div>
          </div>
        ))}

      {messages.length > 0 &&
        messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.senderId === roomID ? 'justify-start' : 'justify-end'}`}>
            <div className="p-2 bg-blue-200 rounded-lg max-w-xs mb-2">
              <span className="block font-medium">{msg.content}</span>
            </div>
          </div>
        ))}

      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default GetMessages;
