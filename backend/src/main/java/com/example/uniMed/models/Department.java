package com.example.uniMed.models;

import jakarta.persistence.*;

@Entity
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer departmentID;

    private String name;
    private String description;
    private String image;
    public Department(Long departmentId2) {
        this.departmentID = Integer.parseInt(departmentId2.toString());
    }
}