package com.example.uniMed.models;

import java.util.Date;
import java.util.List;

import com.example.uniMed.models.DTOs.AppointmentsDTO1;
import com.example.uniMed.models.medicine.Prescription;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.api.client.util.NullValue;

import jakarta.persistence.*;

@Entity
@Table(name = "appointments")

public class Appointments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer appointmentID;

    @ManyToOne
    @JoinColumn(name = "userID")
    @JsonProperty("user")
    private User user;
    private Date appointmentDateTime;
    private String concern;
    private String status;

    public Appointments() {
    }

    @ManyToOne
    @JoinColumn(name = "prescriptionID", nullable = true)
    private Prescription prescription;

    public Integer getAppointmentID() {
        return appointmentID;
    }

    public void setAppointmentID(Integer appointmentID) {
        this.appointmentID = appointmentID;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getAppointmentDateTime() {
        return appointmentDateTime;
    }

    public void setAppointmentDateTime(Date appointmentDateTime) {
        this.appointmentDateTime = appointmentDateTime;
    }

    public String getConcern() {
        return concern;
    }

    public void setConcern(String concern) {
        this.concern = concern;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Prescription getPrescription() {
        return prescription;
    }

    public void setPrescription(Prescription prescription) {
        this.prescription = prescription;
    }
    public AppointmentsDTO1 toDTO(){

        AppointmentsDTO1 dto = new AppointmentsDTO1();
        
       
        if (this.user != null) {
            dto.setUser(this.user.toDTO());
        }
        if (this.appointmentDateTime != null) {
            dto.setAppointmentDateTime(this.appointmentDateTime);
        }
        if (this.concern != null) {
            dto.setConcern(this.concern);
        }
        if (this.status != null) {
            dto.setStatus(this.status);
        }
        if (this.prescription != null) {
            System.out.println("prescription is not null");
            dto.setPrescription(this.prescription.toDto(this.prescription));
        }
        if (this.appointmentID != null) {
            dto.setAppointmentID(this.appointmentID);
        }
        return dto;
    }
}