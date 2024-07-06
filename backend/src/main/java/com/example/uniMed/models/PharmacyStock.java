package com.example.uniMed.models;


import java.util.Date;


import jakarta.persistence.*;


@Entity
public class PharmacyStock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer stockID;

    @ManyToOne
    @JoinColumn(name = "medicineID")
    private Medicines medicine;

    private Integer quantity;
    private Date stockDate;
    private String status;
}