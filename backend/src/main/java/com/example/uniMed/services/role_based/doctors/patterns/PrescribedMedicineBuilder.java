package com.example.uniMed.services.role_based.doctors.patterns;

import com.example.uniMed.models.Medicines;
import com.example.uniMed.models.medicine.PrescribedMedicine;
import com.example.uniMed.models.medicine.Prescription;

public class PrescribedMedicineBuilder {

    private Medicines medicine;
    private Prescription prescription;
    private int quantity;
    private String duration;
    private String afterBefore;

    public PrescribedMedicineBuilder withMedicine(Medicines medicine) {
        this.medicine = medicine;
        return this;
    }

    public PrescribedMedicineBuilder withPrescription(Prescription prescription) {
        this.prescription = prescription;
        return this;
    }

    public PrescribedMedicineBuilder withQuantity(int quantity) {
        this.quantity = quantity;
        return this;
    }

    public PrescribedMedicineBuilder withDuration(String duration) {
        this.duration = duration;
        return this;
    }

    public PrescribedMedicineBuilder withAfterBefore(String afterBefore) {
        this.afterBefore = afterBefore;
        return this;
    }

    public PrescribedMedicine build() {
        PrescribedMedicine prescribedMedicine = new PrescribedMedicine();
        prescribedMedicine.setMedicine(this.medicine);
        prescribedMedicine.setPrescription(this.prescription);
        prescribedMedicine.setQuantity(afterBefore);
        prescribedMedicine.setDuration(this.duration);
        prescribedMedicine.setAfterBefore(this.afterBefore);
        return prescribedMedicine;
    }
}