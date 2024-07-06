package com.example.uniMed.models;

import jakarta.persistence.*;

@Entity
public class Role {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roleID;

    @Column(unique = true, nullable = false)
    private String roleName;
    
}
