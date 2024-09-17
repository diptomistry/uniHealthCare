import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import ChatMessage from "./ChatMessage";

const ChatApp = ({ username }) => {
//  console.log('username',username)
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const connect = (event) => {
    event.preventDefault();
    if (username ) {
      try{
      const socket = new SockJS("http://localhost:8000/websocket");
      console.log('socket',socket)
      const client = new Client({
        webSocketFactory: () => socket,
        onConnect: () => {
          console.log("Connected");
          client.subscribe("/topic/public", onMessageReceived);
          client.publish({
            destination: "/app/chat.register",
            body: JSON.stringify({ sender: username, type: "JOIN" }),
          });
          setIsAuthenticated(true);
        },
        onStompError: (frame) => {
          console.log("Broker reported error: " + frame.headers["message"]);
          console.error(frame);
        },
      onWebSocketError: (event) => {
          console.error("WebSocket error observed:", event);
      },
      onWebSocketClose: (event) => {
          console.log("WebSocket connection closed:", event);
      }
      });
      client.activate();
      setStompClient(client);
    }
    catch(error){
      console.log('error',error)
    }
    } else {
      alert("Wrong password");
    }
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (message && stompClient) {
      const chatMessage = {
        sender: username,
        content: message,
        type: "CHAT",
      };
      stompClient.publish({
        destination: "/app/chat.send",
        body: JSON.stringify(chatMessage),
      });
      setMessage("");
    }
  };

  const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {!isAuthenticated ? (
        
         <button
                type="submit"
                onClick={connect}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Chat
              </button>
      
      ) : (
        <div className="w-full max-w-2xl">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <ul className="space-y-2">
                {messages.map((msg, index) => (
                  <ChatMessage key={index} message={msg} username={username} />
                ))}
              </ul>
            </div>
            <form onSubmit={sendMessage} className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                type="submit"
                className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


export default ChatApp;