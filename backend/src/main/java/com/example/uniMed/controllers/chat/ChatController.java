package com.example.uniMed.controllers.chat;


import com.example.uniMed.models.chat.ChatRoom;
import com.example.uniMed.models.chat.Message;
import com.example.uniMed.services.chat.ChatService;
import org.springframework.data.domain.Page;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;
 
    @PostMapping("/rooms")
    public ChatRoom createChatRoom(@RequestBody List<String> users) {
        return chatService.createChatRoom(users);
    }

    @PostMapping("/rooms/{chatRoomId}/messages")
    public Message sendMessage(@RequestBody Map<String,Object> payload, @PathVariable Long chatRoomId) {
        Long senderId =Long.parseLong( payload.get("senderId").toString());
        String content =  payload.get("content").toString();
        Message message = chatService.sendMessage(senderId, chatRoomId, content);
        
        return message;
    }

    @GetMapping("/rooms/{chatRoomId}/messages")
    public Page<Message> getMessages(@PathVariable Long chatRoomId, 
                                     @RequestParam(defaultValue = "0") int page, 
                                     @RequestParam(defaultValue = "10") int size) {
        return chatService.getMessages(chatRoomId, page, size);
    }
}