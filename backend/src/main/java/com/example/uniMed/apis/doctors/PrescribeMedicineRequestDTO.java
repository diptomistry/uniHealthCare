package com.example.uniMed.apis.doctors;



import java.util.List;

import com.example.uniMed.services.role_based.doctors.PrescribedMedicineDTO;

public class PrescribeMedicineRequestDTO {
    private List<PrescribedMedicineDTO> prescribedMedicines;
    private String description;
    private String date;
    private String status;
    private Integer doctorID;
    private Integer userID;

    // Getters and setters
    public List<PrescribedMedicineDTO> getPrescribedMedicines() {
        return prescribedMedicines;
    }

    public void setPrescribedMedicines(List<PrescribedMedicineDTO> prescribedMedicines) {
        this.prescribedMedicines = prescribedMedicines;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getDoctorID() {
        return doctorID;
    }

    public void setDoctorID(Integer doctorID) {
        this.doctorID = doctorID;
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }
}
