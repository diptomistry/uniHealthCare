package com.example.uniMed.services.chat;


import com.example.uniMed.models.User;
import com.example.uniMed.models.chat.ChatRoom;
import com.example.uniMed.models.chat.Message;
import com.example.uniMed.repositories.auth.UserRepo;
import com.example.uniMed.repositories.chat.ChatRoomRepository;
import com.example.uniMed.repositories.chat.MessageRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.transaction.Transactional;

import org.springframework.ai.vectorstore.filter.FilterExpressionBuilder.Op;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ChatService {

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    @Autowired 
    private UserRepo userRepo;
    @Autowired
    private MessageRepository messageRepository;

  
    @Transactional
    public ChatRoom createChatRoom(List<String> userIds) {
        try {
            if (userIds.size() != 2) {
                throw new IllegalArgumentException("There must be exactly two users in a chat room.");
            }

            System.out.println("users: " + userIds);
            List<User> users = new ArrayList<>();
            for (String userId : userIds) {
                Optional<User> opUser = userRepo.findById(Long.parseLong(userId));
                if (!opUser.isPresent()) {
                    throw new RuntimeException("User not found: " + userId); // Handle the case where the user is not found
                }
                users.add(opUser.get());

            }
            Long userId1 = Long.parseLong(userIds.get(0));
            Long userId2 = Long.parseLong(userIds.get(1));
            // Check if a chat room with the same two users already exists
            List<ChatRoom> existingChatRooms = chatRoomRepository.findByUserIds(userId1, userId2);
            if (existingChatRooms != null) {
                ChatRoom existingChatRoom = existingChatRooms.get(0);
                return existingChatRoom; // Return the existing chat room
            }

            // Create a new chat room
            ChatRoom chatRoom = new ChatRoom();
            chatRoom.setUsers(users);
            ChatRoom savedChatRoom = chatRoomRepository.save(chatRoom);
            return savedChatRoom;
        } catch (Exception e) {
            System.out.println(e);
            throw new RuntimeException("Error creating chat room");
        }
    }
    public Message sendMessage(Long senderId, Long chatRoomId, String content) {
        System.out.println("senderId: " + senderId);
        try{
        User sender = userRepo.findById((senderId)).orElseThrow(() -> new RuntimeException("Sender not found"));
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId).orElseThrow(() -> new RuntimeException("Chat room not found"));
        Message message = new Message();
        message.setSender(sender);
        message.setChatRoom(chatRoom);
        message.setContent(content);
        message.setTimestamp(LocalDateTime.now());
        return messageRepository.save(message);
        }catch(Exception e){
            System.out.println(e);
            return null;
        }
    }

     public Page<Message> getMessages(Long chatRoomId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return messageRepository.findByChatRoomId(chatRoomId, pageable);
    }
}
