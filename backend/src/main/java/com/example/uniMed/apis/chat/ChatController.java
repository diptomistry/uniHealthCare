package com.example.uniMed.apis.chat;

import com.example.uniMed.models.User;
import com.example.uniMed.models.chat.ChatRoom;
import com.example.uniMed.models.chat.Message;
import com.example.uniMed.services.chat.ChatService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
        System.out.println("payload: " + payload);
        Long senderId =Long.parseLong( payload.get("senderId").toString());
        String content =  payload.get("content").toString();
        return chatService.sendMessage(senderId, chatRoomId, content);
    }

    @GetMapping("/rooms/{chatRoomId}/messages")
    public List<Message> getMessages(@PathVariable Long chatRoomId) {
        return chatService.getMessages(chatRoomId);
    }
}