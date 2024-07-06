package com.example.uniMed.models;
import java.util.Date;
import jakarta.persistence.*;
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userID;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String email;

    private Date dob;
    private String name;
    private String sex;
    private String phone;
    private String image;
    private String status = "Pending";
    private String token;
    private String otp;
    private String registeredFrom;

    @ManyToOne
    @JoinColumn(name = "roleID")
    private Role role;

    public User() {
    }
    public String getPassword() {
        return this.password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    String getEmail() {
        return email;
    }
    void setEmail(String email) {
        this.email = email;
    }
    Date getDob() {
        return dob;
    }
    void setDob(Date dob) {
        this.dob = dob;
    }
    String getName() {
        return name;
    }
    void setName(String name) {
        this.name = name;
    }
    String getSex() {
        return sex;
    }
    public Integer getUserID() {
        return userID;
    }
    public void setUserID(Integer userID) {
        this.userID = userID;
    }
    public void setSex(String sex) {
        this.sex = sex;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getImage() {
        return image;
    }
    public void setImage(String image) {
        this.image = image;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public String getOtp() {
        return otp;
    }
    public void setOtp(String otp) {
        this.otp = otp;
    }
    public String getRegisteredFrom() {
        return registeredFrom;
    }
    public void setRegisteredFrom(String registeredFrom) {
        this.registeredFrom = registeredFrom;
    }
    public Role getRole() {
        return role;
    }
    public void setRole(Role role) {
        this.role = role;
    }
    
    

}