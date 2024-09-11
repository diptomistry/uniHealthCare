package com.example.uniMed.repositories.chat;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.uniMed.models.chat.ChatRoom;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    @Query("SELECT cr FROM ChatRoom cr JOIN cr.users u " +
    "WHERE cr.id IN (SELECT cr2.id FROM ChatRoom cr2 JOIN cr2.users u2 " +
    "WHERE u2.userID IN (:userId1, :userId2) GROUP BY cr2.id HAVING COUNT(u2.userID) = 2) " +
    "GROUP BY cr.id HAVING COUNT(u.userID) = 2")
List<ChatRoom> findByUserIds(@Param("userId1") Long userId1, @Param("userId2") Long userId2);

}