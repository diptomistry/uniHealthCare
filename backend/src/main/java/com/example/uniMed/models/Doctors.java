package com.example.uniMed.models;

import java.util.List;

import org.checkerframework.checker.units.qual.s;

import com.example.uniMed.models.DTOs.DoctorsDTO;
import com.example.uniMed.models.rating.Rating;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler", "user" })
@Table(name = "doctors")
public class Doctors extends User {

    @ManyToOne
    @JoinColumn(name = "departmentID")
    private Department department;

    @OneToMany(mappedBy = "doctor")
    @JsonManagedReference
    private List<Rating> ratings;

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

    // Constructors

    public Doctors(Integer doctorID, User user, Department department) {

        this.department = department;
    }
    public DoctorsDTO toDto(Doctors doctor) {
        DoctorsDTO doctorDTO = new DoctorsDTO();
        doctorDTO.setUserID(doctor.getUserID());
        doctorDTO.setEmail(doctor.getEmail());
        doctorDTO.setName(doctor.getName());
        doctorDTO.setSex(doctor.getSex());
        doctorDTO.setPhone(doctor.getPhone());
        doctorDTO.setImage(doctor.getImage());
        doctorDTO.setStatus(doctor.getStatus());
        doctorDTO.setDob(doctor.getDob());
        doctorDTO.setRole(doctor.getRole().getRoleName());
        doctorDTO.setDepartment(doctor.getDepartment());
        return doctorDTO;
    }
    public Doctors() {

    }

    public Doctors(Integer doctorID, User user) {

    }

    public Doctors(User newUser, Long departmentId) {

        this.department = new Department(departmentId);
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

}