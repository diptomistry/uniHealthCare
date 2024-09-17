package com.example.uniMed.services.chat;

import com.example.uniMed.models.User;
import com.example.uniMed.models.chat.ChatRoom;
import com.example.uniMed.models.chat.Message;
import com.example.uniMed.repositories.auth.UserRepo;
import com.example.uniMed.repositories.chat.ChatRoomRepository;
import com.example.uniMed.repositories.chat.MessageRepository;
import org.springframework.data.domain.Page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.websocket.Session;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class ChatService {

    private static final Logger logger = Logger.getLogger(ChatService.class.getName());

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ChatRoomRepository chatRoomRepository;
    private List<Session> sessions = new ArrayList<>();

    @Autowired
    private MessageRepository messageRepository;

    

    public ChatRoom createChatRoom(List<String> userIds) {
        List<User> users = new ArrayList<>();
        for (String userId : userIds) {
            Optional<User> opUser = userRepo.findById(Long.parseLong(userId));
            if (!opUser.isPresent()) {
                throw new RuntimeException("User not found: " + userId);
            }
            users.add(opUser.get());
        }
        Long userId1 = Long.parseLong(userIds.get(0));
        Long userId2 = Long.parseLong(userIds.get(1));
        List<ChatRoom> existingChatRooms = chatRoomRepository.findByUserIds(userId1, userId2);
        if (existingChatRooms != null && !existingChatRooms.isEmpty()) {
            return existingChatRooms.get(0);
        }
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setUsers(users);
        return chatRoomRepository.save(chatRoom);
    }

    public Message sendMessage(Long senderId, Long chatRoomId, String content) {
        Message message = new Message();
        try {
            Optional<User> opUser = userRepo.findById(senderId);
            if (!opUser.isPresent()) {
                throw new RuntimeException("User not found: " + senderId);
            }
            message.setSender(opUser.get());
        } catch (Exception e) {
            e.printStackTrace();
        }
        message.setContent(content);
        message.setTimestamp(LocalDateTime.now());
        messageRepository.save(message);


        // Broadcast the message to all connected WebSocket sessions

        return message;
    }

    public Page<Message> getMessages(Long chatRoomId, int page, int size) {
        return messageRepository.findByChatRoomId(chatRoomId, PageRequest.of(page, size));
    }
    public void addSession(Session session) {
        sessions.add(session);
    }
    public void removeSession(Session session) {
        sessions.remove(session);
    }
}