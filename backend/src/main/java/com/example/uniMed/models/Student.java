package com.example.uniMed.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

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