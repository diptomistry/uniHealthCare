package com.example.uniMed.models;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;


@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "user"})
public class Admin extends User {

    private Date joinDate;
    private Date retiredDate;
    
    public Admin() {
    }

    public Admin(User user, Date joinDate, Date retiredDate) {
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
        this.joinDate = joinDate;
        this.retiredDate = retiredDate;
    }

    public Date getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(Date joinDate) {
        this.joinDate = joinDate;
    }

    public Date getRetiredDate() {
        return retiredDate;
    }

    public void setRetiredDate(Date retiredDate) {
        this.retiredDate = retiredDate;
    }
    
}
