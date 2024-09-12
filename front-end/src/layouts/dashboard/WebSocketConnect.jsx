import React, { useState, useEffect } from 'react';
   import SockJS from 'sockjs-client';
   import { Client } from '@stomp/stompjs';

   const WebSocketConnectionStatus = () => {
     const [connected, setConnected] = useState(false);
     const [error, setError] = useState(null);

     useEffect(() => {
       const socket = new SockJS('http://localhost:8000/ws');
       const client = new Client({
         webSocketFactory: () => socket,
         onConnect: () => {
           console.log('Connected to WebSocket');
           setConnected(true);
           setError(null);
         },
         onDisconnect: () => {
           console.log('Disconnected from WebSocket');
           setConnected(false);
         },
         onStompError: (frame) => {
           console.error('Broker reported error: ' + frame.headers['message']);
           console.error('Additional details: ' + frame.body);
           setError(`STOMP error: ${frame.headers['message']}`);
         }
       });

       client.onWebSocketError = (event) => {
         console.error('WebSocket error observed:', event);
         setError(`WebSocket error: ${JSON.stringify(event, Object.getOwnPropertyNames(event))}`);
       };

       client.activate();

       return () => {
         client.deactivate();
       };
     }, []);

     return (
       <div>
         <h2>WebSocket Connection Status</h2>
         <p>
           Status: {connected ? 'Connected' : 'Disconnected'}
         </p>
         {error && <p className='bg-red-400' style={{color: 'red'}}>Error: {error}</p>}
       </div>
     );
   };

   export default WebSocketConnectionStatus;