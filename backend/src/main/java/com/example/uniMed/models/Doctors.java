package com.example.uniMed.models;

import jakarta.persistence.*;

@Entity
public class Doctors {
   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer doctorID;

    @ManyToOne
    @JoinColumn(name = "userID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "departmentID")
    private Department department;

    public Doctors(Integer doctorID, User user, Department department) {
        this.doctorID = doctorID;
        this.user = user;
        this.department = department;
    }
    public Doctors() {
        //TODO Auto-generated constructor stub
    }
    public Doctors(Integer doctorID, User user) {
        this.doctorID = doctorID;
        this.user = user;
    }
    public Doctors(User newUser, Long departmentId) {
        this.user = newUser;
        this.department = new Department(departmentId);
    }
    public Integer getDoctorID() {
        return doctorID;
    }
    public void setDoctorID(Integer doctorID) {
        this.doctorID = doctorID;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public Department getDepartment() {
        return department;
    }
    public void setDepartment(Department department) {
        this.department = department;
    }
    
}