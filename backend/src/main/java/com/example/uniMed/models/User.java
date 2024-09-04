package com.example.uniMed.models;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import com.example.uniMed.models.chat.ChatRoom;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "userID")

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userID;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String email;

    @Temporal(TemporalType.DATE)
    private Date dob;
    private String name;
    private String sex;
    private String phone;
    private String image;
    private String status = "Pending";
    private String token;
    private String otp;
    private String registeredFrom;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "roleid")
    private Role role;

    @ManyToMany(mappedBy = "users")
    @JsonBackReference
    private List<ChatRoom> chatRooms;

    public List<ChatRoom> getChatRooms() {
        return chatRooms;
    }

    public void setChatRooms(List<ChatRoom> chatRooms) {
        this.chatRooms = chatRooms;
    }

    public User() {
    }

    public User getUser() {
        return this;
    }

    public User(Integer userID, String password, String email, Date dob, String name, String sex, String phone,
            String image, String status, String token, String otp, String registeredFrom, Role role) {
        this.userID = userID;
        this.password = password;
        this.email = email;
        this.dob = dob;
        this.name = name;
        this.sex = sex;
        this.phone = phone;
        this.image = image;
        this.status = status;
        this.token = token;
        this.otp = otp;
        this.registeredFrom = registeredFrom;
        this.role = role;
    }

    public User(String hashedPassword, String email, Date dob, String name, String sex, Role role,
            String filePath, String token, String status, String registeredFrom, String phone) {
        this.password = hashedPassword;
        this.email = email;
        this.dob = dob;
        this.name = name;
        this.sex = sex;
        this.role = role;
        this.image = filePath;
        this.token = token;
        this.status = status;
        this.registeredFrom = registeredFrom;
        this.phone = phone;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
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

    public void setRoleId(Integer roleId) {
        this.role = new Role(roleId);
    }

}
