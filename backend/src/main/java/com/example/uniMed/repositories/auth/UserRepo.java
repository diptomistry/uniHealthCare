package com.example.uniMed.repositories.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.uniMed.models.User;




@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    User findByEmail(String email);

    

    User save(User user);
}

