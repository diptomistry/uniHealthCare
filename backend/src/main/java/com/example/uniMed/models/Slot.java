package com.example.uniMed.models;
import jakarta.persistence.*;
import java.time.LocalTime;
// Slot entity
@Entity
@Table(name = "Slot")
public class Slot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int slotID;

    private LocalTime startTime;
    private LocalTime endTime;

    // Getters and Setters
}

