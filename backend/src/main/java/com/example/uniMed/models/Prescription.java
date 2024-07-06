package com.example.uniMed.models;
import jakarta.persistence.*;
@Entity
@Table(name = "Prescriptions")
public class Prescription {
    @Id
    private int prescriptionID;
    private int medicinePrescriptionID;

    // Getters and Setters
}