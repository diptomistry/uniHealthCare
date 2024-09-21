package com.example.uniMed.models.medicine;

import java.util.List;

import com.example.uniMed.models.Doctors;
import com.example.uniMed.models.User;
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

@Entity
@Table(name = "prescription")
public class Prescription {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer prescriptionID;


    private String description;
    private String date;

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
}
