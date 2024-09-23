package com.example.uniMed.models.medicine;

import com.example.uniMed.models.Medicines;
import com.example.uniMed.services.role_based.doctors.PrescribedMedicineDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;



@Entity
@Table(name = "prescribed_medicine")

public class PrescribedMedicine  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer prescribedMedicineID;
    private String quantity;
    private String duration;
    private String afterBefore;
    @ManyToOne
    @JoinColumn(name = "medicineID")
    private Medicines medicine;
   




    @ManyToOne
    @JoinColumn(name = "prescriptionID")
    @JsonIgnoreProperties("prescribedMedicines")
    @JsonIgnore
    private Prescription prescription;


    public Integer getPrescribedMedicineID() {
        return prescribedMedicineID;
    }

    public void setPrescribedMedicineID(Integer prescribedMedicineID) {
        this.prescribedMedicineID = prescribedMedicineID;
    }

    public Medicines getMedicine() {
        return medicine;
    }

    public Prescription getPrescription() {
        return prescription;
    }

    public void setPrescription(Prescription prescription) {
        this.prescription = prescription;
    }

  

    public void setMedicine(Medicines medicine) {
        this.medicine = medicine;
    }

    public PrescribedMedicine() {
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

    public PrescribedMedicineDTO toDTO() {
        PrescribedMedicineDTO prescribedMedicineDTO = new PrescribedMedicineDTO();
        if (medicine != null) {
            prescribedMedicineDTO.setName(medicine.getName());
            prescribedMedicineDTO.setMedicineID(medicine.getMedicineID());
        }
        if (quantity != null) {
            prescribedMedicineDTO.setQuantity(quantity);
        }
        if (duration != null) {
            prescribedMedicineDTO.setDuration(duration);
        }
        if (afterBefore != null) {
            prescribedMedicineDTO.setAfterBefore(afterBefore);
        }
        return prescribedMedicineDTO;
    }
}
