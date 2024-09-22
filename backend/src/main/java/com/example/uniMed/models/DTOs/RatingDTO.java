package com.example.uniMed.models.DTOs;

import java.time.LocalDateTime;

import com.example.uniMed.models.rating.Rating;
import com.google.gson.annotations.Since;

import jakarta.annotation.Nonnull;

public class RatingDTO {

    private Long id;
    private Long doctorId;
    private Long userId;
    private Double rating;
    private String review;
    private LocalDateTime createdAt;
    private UserDTO user;
    private UserDTO doctor;

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public static RatingDTO fromRating(Rating rating) {
        RatingDTO dto = new RatingDTO();
        dto.setId(rating.getId());
        dto.setDoctorId(rating.getDoctor().getUserID().longValue());
        if (rating.getUser() != null) {
            if (rating.getUser().getUserID() != null) {
                dto.setUserId(rating.getUser().getUserID().longValue());
            }
        }
        dto.setRating(rating.getRating());
        dto.setReview(rating.getReview());
        dto.setCreatedAt(rating.getCreatedAt());
        if (rating.getUser() != null) {
            dto.setUser(rating.getUser().toDTO());
        }
        if (rating.getDoctor() != null) {
            dto.setDoctor(rating.getDoctor().toDTO());
        }

        return dto;
    }

    public RatingDTO() {
    }

    public RatingDTO(Double rating, String review, Long doctorId) {
        this.rating = rating;
        this.review = review;
        this.doctorId = doctorId;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public UserDTO getDoctor() {
        return doctor;
    }

    public void setDoctor(UserDTO doctor) {
        this.doctor = doctor;
    }
}