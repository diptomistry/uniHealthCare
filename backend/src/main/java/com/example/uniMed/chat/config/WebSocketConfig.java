package com.example.uniMed.chat.config;

import java.util.Map;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.*;
import org.springframework.web.socket.server.HandshakeInterceptor;

/**
 * Configuration class for WebSocket messaging in the application.
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    /**
     * Registers the Stomp endpoints for WebSocket communication.
     * param registry the StompEndpointRegistry to register the endpoints
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/websocket").setAllowedOriginPatterns("http://localhost:5173").withSockJS().setInterceptors(new HandshakeInterceptor() {
                
                @Override
                public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
                    System.out.println("Handshake request received: " + request.getURI());
                    return true;
                }

                @Override
                public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {
                    if (exception != null) {
                        System.err.println("Handshake failed: " + exception.getMessage());
                    } else {
                        System.out.println("Handshake successful");
                    }
                }
            });
    }

    /**
     * Configures the message broker for WebSocket communication.
     * param registry the MessageBrokerRegistry to configure the message broker
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic");
        registry.setApplicationDestinationPrefixes("/app");
    }
}
