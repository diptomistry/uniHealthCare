package com.example.uniMed.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.Date;

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