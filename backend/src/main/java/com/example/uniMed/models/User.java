package com.example.uniMed.models;

import java.sql.Date;
import java.util.List;

import com.example.uniMed.models.DTOs.UserDTO;
import com.example.uniMed.models.chat.ChatRoom;
import com.example.uniMed.models.rating.Rating;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "users")

@Inheritance(strategy = InheritanceType.JOINED)
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "userID")

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userID;

    @Column(nullable = false)
    @JsonIgnore
    private String password;

    @Column(unique = true, nullable = false)
    @JsonProperty("email")
    private String email;

    @Temporal(TemporalType.DATE)
    private Date dob;

    @JsonProperty("name")
    private String name;

    private String sex;
    private String phone;
    private String image;
    private String status = "Pending";

    private String token;
    private String otp;
    private String registeredFrom;
    private String address;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "roleid")
    private Role role;

    @ManyToMany(mappedBy = "users")
    @JsonIgnore
    private List<ChatRoom> chatRooms;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private List<Rating> ratings;

    // Private constructor for Builder
    private User(Builder builder) {
        this.userID = builder.userID;
        this.password = builder.password;
        this.email = builder.email;
        this.dob = builder.dob;
        this.name = builder.name;
        this.sex = builder.sex;
        this.phone = builder.phone;
        this.image = builder.image;
        this.status = builder.status;
        this.token = builder.token;
        this.otp = builder.otp;
        this.registeredFrom = builder.registeredFrom;
        this.address = builder.address;
        this.role = builder.role;
    }

    // Empty constructor for JPA
    public User() {}

    // toDTO method
    public UserDTO toDTO() {
        UserDTO dto = new UserDTO();
        dto.setUserID(this.userID);
        dto.setEmail(this.email);
        dto.setName(this.name);
        dto.setSex(this.sex);
        dto.setPhone(this.phone);
        dto.setImage(this.image);
        dto.setStatus(this.status);
        dto.setDob(this.dob);
        dto.setRole(this.role != null ? this.role : null);
        dto.setToken(this.token);
        dto.setAddress(this.address);
        return dto;
    }

    // Getters and setters remain unchanged

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public String getPassword() {
        return password;
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
    public void setRoleId(Integer roleId) {
        this.role = new Role(roleId); // Assuming Role has a constructor that accepts an ID
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<ChatRoom> getChatRooms() {
        return chatRooms;
    }

    public void setChatRooms(List<ChatRoom> chatRooms) {
        this.chatRooms = chatRooms;
    }

    public List<Rating> getRatings() {
        return ratings;
    }

    public void setRatings(List<Rating> ratings) {
        this.ratings = ratings;
    }

    // Builder Class
    public static class Builder {
        private Integer userID;
        private String password;
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
        private String address;
        private Role role;

        // Builder methods for setting fields
        public Builder userID(Integer userID) {
            this.userID = userID;
            return this;
        }

        public Builder password(String password) {
            this.password = password;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public Builder dob(Date dob) {
            this.dob = dob;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder sex(String sex) {
            this.sex = sex;
            return this;
        }

        public Builder phone(String phone) {
            this.phone = phone;
            return this;
        }

        public Builder image(String image) {
            this.image = image;
            return this;
        }

        public Builder status(String status) {
            this.status = status;
            return this;
        }
        

        public Builder token(String token) {
            this.token = token;
            return this;
        }

        public Builder otp(String otp) {
            this.otp = otp;
            return this;
        }

        public Builder registeredFrom(String registeredFrom) {
            this.registeredFrom = registeredFrom;
            return this;
        }

        public Builder address(String address) {
            this.address = address;
            return this;
        }

        public Builder role(Role role) {
            this.role = role;
            return this;
        }

        // Build method to create User object
        public User build() {
            return new User(this);
        }
    }
}