package com.example.uniMed.models;
import java.util.Date;
import javax.persistence.*;
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
    

}