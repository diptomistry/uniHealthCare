package com.example.uniMed.models;
import jakarta.persistence.*;
import java.time.LocalDate;
// PhotoGallery entity
@Entity
@Table(name = "PhotoGallery")
public class PhotoGallery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int photoID;

    private String image;
    private LocalDate date;

    @Column(length = 100)
    private String title;

    // Getters and Setters
}
