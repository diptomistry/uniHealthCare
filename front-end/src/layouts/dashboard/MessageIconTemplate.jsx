import React, { useContext, useState, useEffect } from "react";


import { UserContext } from "../../services/auth/UserProvider";
const MessageIconTemplate = ({ receiverID, receiverName, receiverImage }) => {
  const { user } = useContext(UserContext);
 
  const [isModalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [roomID, setRoomID] = useState(null);
  const [webSocket, setWebSocket] = useState(null);

  useEffect(() => {
    if (roomID===null) {
      return;
    }
    const endpoint = 'ws://localhost:8000/ws/chat';
    console.log('Connecting to WebSocket at:', endpoint);
    const socket = new WebSocket(endpoint);

    socket.onopen = () => {
      console.log('Connected to WebSocket');
    };

    socket.onmessage = (event) => {
      console.log('Received message: ', event.data);
      showMessage(event.data);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error: ', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setWebSocket(socket);

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const showMessage = (message) => {
    console.log('Received message: ', message);
    // Handle the incoming message
  };

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
        },
        body: JSON.stringify([user.userID, receiverID]),
      });
      const data = await response.json();
      setRoomID(data.id);
      console.log("Chat room created with ID:", data.id);
    } catch (error) {
      console.error("Error creating chat room:", error);
    }
  };

  const sendMessage = () => {
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      const messagePayload = {
        senderId: user.userID,
        chatRoomId: roomID,
        content: message,
      };
      webSocket.send(JSON.stringify(messagePayload));
      setMessage("");
    } else {
      console.error("WebSocket is not open. Unable to send message.");
    }
  };

  return (
    <div>
      {/* Your component JSX */}
      <button onClick={openModal}>Open Chat</button>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default MessageIconTemplate;
