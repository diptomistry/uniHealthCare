package com.example.uniMed.models.DTOs;

import java.util.Date;

public class MedicineRequestDTO {

    private String requestedBy;
    private Date stockEndDate;
    private Long medicineID;
    private int quantity;

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

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}