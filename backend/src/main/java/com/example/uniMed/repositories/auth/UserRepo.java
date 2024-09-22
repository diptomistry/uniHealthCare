package com.example.uniMed.repositories.auth;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.uniMed.models.Role;
import com.example.uniMed.models.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    @Modifying
    @Query("DELETE FROM User u WHERE u.id = :userId")

    void deleteUserData(Long userId);
 long countByStatus(String status);
    
    long countByRole(Role role); // Use Role entity instead of String
    // findById method is for finding by user ID
    Optional<User> findById(Long userId); // Use Long instead of String for user ID
}
