package com.example.uniMed.models;

import jakarta.persistence.*;

@Entity
public class Student {
    public Student(Object id, Long department_id, String session2, String registrationNo2) {
        this.department = department;
        this.session = session;
        this.registrationNo = registrationNo;
    
        //TODO Auto-generated constructor stub
    }
    @Id
    private String registrationNo;

    @ManyToOne
    @JoinColumn(name = "userID")
    private User user;

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

    private String department;
    private String session;
}