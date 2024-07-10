package com.example.uniMed.repositories.auth;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.uniMed.models.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByRoleName(String roleName);
}