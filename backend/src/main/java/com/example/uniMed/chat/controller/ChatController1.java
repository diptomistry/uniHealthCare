package com.example.uniMed.chat.controller;

import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import com.example.uniMed.chat.model.ChatMessage;

/**
 * Controller class for handling chat-related functionality.
 */
@Controller
public class ChatController1 {

    /**
     * Registers a user for chat.
     * 
     * param chatMessage The chat message containing the sender's information.
     * param headerAccessor The SimpMessageHeaderAccessor object used to access session attributes.
     * return The registered chat message.
     */
    @MessageMapping("/chat.register")
    @SendTo("/topic/public")
    public ChatMessage register(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        System.out.println("User Registered : " + chatMessage.getSender());
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage;
    }

    /**
     * Sends a chat message to all connected users.
     * 
     * param chatMessage The chat message to be sent.
     * return The sent chat message.
     */
    @MessageMapping("/chat.send")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }
}
