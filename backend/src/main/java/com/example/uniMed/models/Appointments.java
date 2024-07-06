package com.example.uniMed.models;
import java.util.Date;

import jakarta.persistence.*;



@Entity
public class Appointments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer appointmentID;

    @ManyToOne
    @JoinColumn(name = "userID")
    private User user;

    private Date appointmentDateTime;
    private String concern;
    private String status;
}