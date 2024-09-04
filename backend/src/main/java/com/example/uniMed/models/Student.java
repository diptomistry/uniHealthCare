package com.example.uniMed.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
public class Student extends User {

    private String registrationNo;
    private String department;
    private String session;
    
  @OneToOne
    @JoinColumn(name = "userid")
    @JsonIgnore
    private User user;
    public void setUser(User user) {
        super.setEmail(user.getEmail());
        super.setDob(user.getDob());
        super.setName(user.getName());
        super.setSex(user.getSex());
        super.setRole(user.getRole());
        super.setImage(user.getImage());
        super.setPhone(user.getPhone());
        super.setUserID(user.getUserID());
        super.setPassword(user.getPassword());
        super.setToken(user.getToken());
        super.setOtp(user.getOtp());
        super.setRegisteredFrom(user.getRegisteredFrom());
        super.setRole(user.getRole());
        super.setStatus(user.getStatus());
      
    }

    public Student() {
    }
    public String getRegistrationNo() {
        return registrationNo;
    }

    public void setRegistrationNo(String registrationNo) {
        this.registrationNo = registrationNo;
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
}