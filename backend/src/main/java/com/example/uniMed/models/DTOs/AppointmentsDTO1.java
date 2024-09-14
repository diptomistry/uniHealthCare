package com.example.uniMed.models.DTOs;


import java.util.Date;
import java.util.List;

import com.example.uniMed.models.Doctors;
import com.example.uniMed.models.User;
import com.example.uniMed.models.medicine.Prescription;





public class AppointmentsDTO1 {
  
    private Integer appointmentID;

   private Integer userID;
    private User user;

    private Date appointmentDateTime;
    private String concern;
    private String status;    
    private Prescription prescription;
 
    
     
    private Doctors doctor;
 

    public AppointmentsDTO1() {
    }

   


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
    public Doctors getDoctor() {
        return doctor;
    }
    public void setDoctor(Doctors doctor) {
        this.doctor = doctor;
    }




    public Integer getUserID() {
        return userID;
    }




    public void setUserID(Integer userID) {
        this.userID = userID;
    }
    
}