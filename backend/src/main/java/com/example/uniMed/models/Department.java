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
    public Department() {
    }
    public Integer getDepartmentID() {
        return departmentID;
    }
  

    public void setDepartmentID(Integer departmentID) {
        this.departmentID = departmentID;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getImage() {
        return image;
    }
    public void setImage(String image) {
        this.image = image;
    }
    public Department(Long departmentId) {
        this.departmentID = Integer.parseInt(departmentId.toString());
    }
}