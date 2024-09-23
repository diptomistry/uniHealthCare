package com.example.uniMed.models.DTOs;



import java.util.ArrayList;
import java.util.List;

import com.example.uniMed.models.medicine.PrescribedMedicine;
import com.example.uniMed.services.role_based.doctors.PrescribedMedicineDTO;

public class PrescriptionDTO {
    private Integer prescriptionID;
    private String description;
    private String date;
    private UserDTO patient;
    private DoctorsDTO doctor;
    private List<PrescribedMedicineDTO> prescribedMedicines;

    // Getters and Setters
    public Integer getPrescriptionID() {
        return prescriptionID;
    }

    public void setPrescriptionID(Integer prescriptionID) {
        this.prescriptionID = prescriptionID;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public UserDTO getPatient() {
        return patient;
    }

    public void setPatient(UserDTO patient) {
        this.patient = patient;
    }

    public DoctorsDTO getDoctor() {
        return doctor;
    }
    public void setDoctor(DoctorsDTO doctor) {
        this.doctor = doctor;
    }

      public List<PrescribedMedicineDTO> getPrescribedMedicines() {
        return prescribedMedicines;
    }

    public void setPrescribedMedicines(List<PrescribedMedicine> prescribedMedicines) {
        List<PrescribedMedicineDTO> prescribedMedicineDTOs = new ArrayList<>();
        for (PrescribedMedicine prescribedMedicine : prescribedMedicines) {
            prescribedMedicineDTOs.add(prescribedMedicine.toDTO());
        }
        this.prescribedMedicines = prescribedMedicineDTOs;
    }
}