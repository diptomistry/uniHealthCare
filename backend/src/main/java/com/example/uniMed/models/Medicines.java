package com.example.uniMed.models;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
public class Medicines {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer medicineID;

    private String name;
    private Date entryDate;
    private Date expiryDate;
    private String description;
    private BigDecimal price;

    @ManyToOne
    @JoinColumn(name = "addedBy")
    private User addedBy;

    private Integer stockQuantity;
}