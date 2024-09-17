package com.example.uniMed.chat.config;


import java.util.logging.Logger;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.example.uniMed.chat.model.ChatMessage;

import groovy.util.logging.Slf4j;
import lombok.RequiredArgsConstructor;


/**
    * Handles the WebSocket disconnect event.
    * Sends a leave message to the "/topic/public" destination when a user disconnects.
    *
    * param event The SessionDisconnectEvent representing the WebSocket disconnect event.
    */
@Component
@Slf4j
@RequiredArgsConstructor
public class WebSocketEventListener {

    private final SimpMessageSendingOperations messagingTemplate;

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("username");
        if (username != null) {
           System.out.println("User Disconnected : " + username);
            var chatMessage = ChatMessage.builder()
                    .type(ChatMessage.MessageType.LEAVE)
                    .sender(username)
                    .build();
            messagingTemplate.convertAndSend("/topic/public", chatMessage);
        }
    }

}
