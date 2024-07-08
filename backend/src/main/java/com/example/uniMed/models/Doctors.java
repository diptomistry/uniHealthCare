package com.example.uniMed.models;

import jakarta.persistence.*;

@Entity
public class Doctors {
    public Doctors(Object id, String user_type) {
        this.doctorID = (Integer) id;
        //TODO Auto-generated constructor stub
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer doctorID;

    @ManyToOne
    @JoinColumn(name = "userID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "departmentID")
    private Department department;
}