package com.example.uniMed.models;

import jakarta.persistence.*;
@Entity
@Table(name = "appointment_doctors")
public class AppoinmentDoctors {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int prescriptionID;

    private int appointmentID;
    private int doctorID;

    @ManyToOne
    @JoinColumn(name = "appointmentID", insertable = false, updatable = false)
    private Appointments appointment;

    @ManyToOne
    @JoinColumn(name = "doctorID", insertable = false, updatable = false)
    private Doctors doctor;

    private String instructions;
    private String tests;

    // Getters and Setters
}


