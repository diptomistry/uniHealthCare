package com.example.uniMed.models;
import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity
@Table(name = "Services")
public class Services {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int serviceID;

    @Column(nullable = false, length = 100)
    private String name;

    private String description;
    private String image;
    private LocalDateTime date;

    // Getters and Setters
}