package com.example.uniMed.models;

import jakarta.persistence.*;

@Entity
public class Student {
    @Id
    private String registrationNo;

    @ManyToOne
    @JoinColumn(name = "userID")
    private User user;

    private String department;
    private String session;
}