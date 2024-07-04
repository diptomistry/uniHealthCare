package com.example.uniMed.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Role {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roleID;

    @Column(unique = true, nullable = false)
    private String roleName;
    
}
