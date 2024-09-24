package com.example.uniMed.models.medicine;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.example.uniMed.models.Doctors;
import com.example.uniMed.models.User;
import com.example.uniMed.models.DTOs.PrescriptionDTO;
import com.example.uniMed.services.role_based.doctors.PrescribedMedicineDTO;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;

@Entity
@Table(name = "prescription")
public class Prescription {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer prescriptionID;


    private String description;
    private String date;

    @Column(columnDefinition = "TEXT")
    private String diagnosis;

     @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userID")
    @JsonManagedReference
    private User patient;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "doctorID")
    @JsonManagedReference
    private Doctors doctor;

    @OneToMany(mappedBy = "prescription", cascade = CascadeType.ALL, orphanRemoval = true)

    List<PrescribedMedicine> prescribedMedicines;


    

    public Prescription() {
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



    public List<PrescribedMedicine> getPrescribedMedicines() {
        return prescribedMedicines;
    }



    public void setPrescribedMedicines(List<PrescribedMedicine> prescribedMedicines) {
        this.prescribedMedicines = prescribedMedicines;
    }



   


    public User getPatient() {
        return patient;
    }



    public void setPatient(User patient) {
        this.patient = patient;
    }



    public Doctors getDoctor() {
        return doctor;
    }



    public void setDoctor(Doctors doctor) {
        this.doctor = doctor;
    }



    public Integer getPrescriptionID() {
        return prescriptionID;
    }

    public PrescriptionDTO toDto(Prescription prescription) {
        PrescriptionDTO prescriptionDTO = new PrescriptionDTO();
        
       if (prescription.getDoctor() != null) {
            prescriptionDTO.setDoctor(prescription.getDoctor().toDto(prescription.getDoctor()));
        }
        // if (prescription.getPatient() != null) {
        //     prescriptionDTO.setPatient(prescription.getPatient().toDTO(prescription.getPatient()));
        // }
       if (prescription.getPrescribedMedicines() != null) {
          List<PrescribedMedicineDTO> prescribedMedicines = new ArrayList<>();
                for (PrescribedMedicine prescribedMedicine : prescription.getPrescribedMedicines()) {
                    prescribedMedicines.add(prescribedMedicine.toDTO());
                }
        }
        if (prescription.getDate() != null) {
            prescriptionDTO.setDate(prescription.getDate());
        }
        if (prescription.getDescription() != null) {
            prescriptionDTO.setDescription(prescription.getDescription());
        }
        if (prescription.getPrescriptionID() != null) {
            prescriptionDTO.setPrescriptionID(prescription.getPrescriptionID());
        }
        if (prescription.getDiagnosis() != null) {
            prescriptionDTO.setDiagnosis(prescription.getDiagnosis());
        }
        

        return prescriptionDTO;
    }




    public String getDiagnosis() {
        return diagnosis;
    }




    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }
}
