package com.example.uniMed.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.Date;

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