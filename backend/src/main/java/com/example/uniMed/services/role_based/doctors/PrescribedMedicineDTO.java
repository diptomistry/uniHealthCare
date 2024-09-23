package com.example.uniMed.services.role_based.doctors;

import jakarta.annotation.Nullable;

public class PrescribedMedicineDTO {
    @Nullable
    private String name;
 
    private Integer medicineID;
    private String quantity;
    private String duration;
    private String afterBefore;

    public PrescribedMedicineDTO() {
    }

    public PrescribedMedicineDTO(String name, String quantity, String duration, String afterBefore, Integer medicineID) {
        this.name = name;
        this.quantity = quantity;
        this.duration = duration;
        this.afterBefore = afterBefore;
    }
    public Integer getMedicineID() {
        return medicineID;
    }
    public void setMedicineID(Integer medicineID) {
        this.medicineID = medicineID;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getAfterBefore() {
        return afterBefore;
    }

    public void setAfterBefore(String afterBefore) {
        this.afterBefore = afterBefore;
    }
    
}
