package com.example.uniMed.models;

import jakarta.persistence.*;

@Entity
public class Student {

    @Id
    private String registrationNo;

    @ManyToOne
    @JoinColumn(name = "userID")
    private User user;

    private String department;
    private String session;

    // Default constructor
    public Student() {}

    // Constructor with fields
    public Student(User user, String departmentId, String session, String registrationNo) {
        this.user = user;
        this.department = departmentId.toString();  // Assuming department is stored as a string
        this.session = session;
        this.registrationNo = registrationNo;
    }

    // Getters and setters
    public String getRegistrationNo() {
        return registrationNo;
    }

    public void setRegistrationNo(String registrationNo) {
        this.registrationNo = registrationNo;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getSession() {
        return session;
    }

    public void setSession(String session) {
        this.session = session;
    }

    @Override
    public String toString() {
        return "Student [registrationNo=" + registrationNo + ", user=" + user + ", department=" + department
                + ", session=" + session + "]";
    }
}
