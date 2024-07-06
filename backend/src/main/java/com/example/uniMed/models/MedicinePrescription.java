package com.example.uniMed.models;
import jakarta.persistence.*;
// MedicinePrescription entity
@Entity
@Table(name = "MedicinePrescription")
public class MedicinePrescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int medicinePrescriptionID;

    private int medicineID;

    @ManyToOne
    @JoinColumn(name = "medicineID", insertable = false, updatable = false)
    private Medicines medicine;

    private String quantity;
    private String duration;

    @Column(length = 20)
    private String afterBefore;

    // Getters and Setters
}

