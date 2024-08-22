package com.example.uniMed.repositories.auth.role;



import com.example.uniMed.models.Role;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    boolean existsByRoleName(String roleName);

    Optional<Role> findByRoleName(String userType);
    
}