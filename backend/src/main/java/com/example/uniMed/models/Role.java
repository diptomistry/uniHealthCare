package com.example.uniMed.models;

import jakarta.persistence.*;

@Entity
public class Role {
     public Role(Integer userRoleId) {
        //TODO Auto-generated constructor stub
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roleID;

    @Column(unique = true, nullable = false)
    private String roleName;
    
}
