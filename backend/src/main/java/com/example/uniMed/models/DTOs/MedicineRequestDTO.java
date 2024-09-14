package com.example.uniMed.models.DTOs;



public class MedicineRequestDTO {
    private Integer medicineId;
    private Integer stock;

    // Getters and Setters
    public Integer getMedicineId() {
        return medicineId;
    }

    public void setMedicineId(Integer medicineId) {
        this.medicineId = medicineId;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }
}
