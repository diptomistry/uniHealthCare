package com.example.uniMed.models.DTOs;

import java.util.Date;

public class MedicineRequestDTO {

    private String requestedBy;
    private Date stockEndDate;
    private Long medicineID;
    private String status;
    private Long id;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    private Integer quantity;

    private UserDTO user;

    private MedicinesDTO medicine;

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    // Getters and Setters
    public String getRequestedBy() {
        return requestedBy;
    }

    public void setRequestedBy(String requestedBy) {
        this.requestedBy = requestedBy;
    }

    public Date getStockEndDate() {
        return stockEndDate;
    }

    public void setStockEndDate(Date stockEndDate) {
        this.stockEndDate = stockEndDate;
    }

    public Long getMedicineID() {
        return medicineID;
    }

    public void setMedicineID(Long medicineID) {
        this.medicineID = medicineID;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public MedicinesDTO getMedicine() {
        return medicine;
    }

    public void setMedicine(MedicinesDTO medicine) {
        this.medicine = medicine;
    }
}