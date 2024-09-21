package com.example.uniMed.models.DTOs;

import com.google.gson.annotations.Since;

import jakarta.annotation.Nonnull;

public class RatingDTO {
    
    
    private Double rating;

  
    private String review;

   
    private Long doctorId;

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
}