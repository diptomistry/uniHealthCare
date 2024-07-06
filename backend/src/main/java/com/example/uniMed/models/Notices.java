package com.example.uniMed.models;
import jakarta.persistence.*;
import java.time.LocalDate;
// Notices entity
@Entity
@Table(name = "Notices")
public class Notices {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int noticeID;

    @Column(nullable = false, length = 100)
    private String title;

    private String description;
    private String image;
    private boolean mainPage;
    private boolean isAdmin;
    private LocalDate date;
    private String link;

    // Getters and Setters
}
