package com.example.uniMed.models;
import jakarta.persistence.*;
import java.time.LocalDateTime;


@Entity
@Table(name = "Dispensation")
public class Dispensation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int dispensationID;

    private int appointmentID;

    @ManyToOne
    @JoinColumn(name = "appointmentID", insertable = false, updatable = false)
    private Appointments appointment;

    @Column(nullable = false)
    private int dispensedQuantity;

    private LocalDateTime dispensedDateTime;

    private int stockID;

    @ManyToOne
    @JoinColumn(name = "stockID", insertable = false, updatable = false)
    private PharmacyStock pharmacyStock;

    // Getters and Setters
}
