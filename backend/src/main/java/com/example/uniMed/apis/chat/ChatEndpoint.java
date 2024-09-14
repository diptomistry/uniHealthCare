package com.example.uniMed.apis.chat;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.uniMed.services.chat.ChatService;

import java.io.IOException;
import java.util.logging.Logger;

@ServerEndpoint("/ws/chat")
public class ChatEndpoint {

    private static final Logger logger = Logger.getLogger(ChatEndpoint.class.getName());
     @Autowired
    private ChatService chatService;

    @OnOpen
    public void onOpen(Session session) {
        logger.info("Connected: " + session.getId());
        chatService.addSession(session);
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        logger.info("Received message: " + message + " from " + session.getId());
        try {
            session.getBasicRemote().sendText("Echo: " + message);
        } catch (IOException e) {
            logger.severe("Error sending message: " + e.getMessage());
        }
    }

    @OnClose
    public void onClose(Session session) {
        chatService.removeSession(session);
        logger.info("Disconnected: " + session.getId());
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        logger.severe("Error: " + throwable.getMessage());
    }
}