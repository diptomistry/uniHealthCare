package com.example.uniMed.apis.role_based.doctors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.uniMed.models.Doctors;
import com.example.uniMed.models.DTOs.RatingDTO;
import com.example.uniMed.models.rating.Rating;
import com.example.uniMed.repositories.auth.UserRepo;
import com.example.uniMed.repositories.doctor.RatingRepository;
import com.example.uniMed.repositories.publics.duty_roster.DoctorRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

  @Autowired
  private RatingRepository ratingRepository;

  @Autowired
  private DoctorRepository doctorRepository;

  @Autowired
  private UserRepo userRepository;

  @GetMapping("/doctor/{doctorId}")
  public List<RatingDTO> getRatingsByDoctor(@PathVariable Long doctorId) {
    Doctors doctor = doctorRepository.findById(doctorId)
        .orElseThrow(() -> new RuntimeException("Doctor not found"));
    List<Rating> ratings = ratingRepository.findByDoctor(doctor);
    List<RatingDTO> ratingDTOs = new ArrayList<>();
    for (Rating rating : ratings) {
      ratingDTOs.add(RatingDTO.fromRating(rating));
    }
    return ratingDTOs;
  }

  @PostMapping("/doctor/{doctorId}/user/{userId}")
  public RatingDTO addRating(@PathVariable Long doctorId, @PathVariable Long userId,
      @RequestBody RatingDTO ratingDTO) {
    Rating rating = new Rating();
    rating.setDoctor(doctorRepository.findById(doctorId)
        .orElseThrow(() -> new RuntimeException("Doctor not found")));
    rating.setUser(userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found")));
    rating.setRating(ratingDTO.getRating());
    rating.setReview(ratingDTO.getReview());
    rating.setCreatedAt(LocalDateTime.now());
    Rating savedRating = ratingRepository.save(rating);
    ratingDTO.setUser(rating.getUser().toDTO());
    ratingDTO.setDoctor(rating.getDoctor().toDTO());
    return RatingDTO.fromRating(savedRating);
  }
  @GetMapping("/doctor/{doctorId}/user/{userId}/reviews")
  public List<RatingDTO> getReviewsByDoctorAndUser(@PathVariable Long doctorId, @PathVariable Long userId) {
    List<Rating> ratings = ratingRepository.findByDoctorUserIDAndUserUserID(doctorId, userId);
    return ratings.stream()
                  .map(RatingDTO::fromRating)
                  .collect(Collectors.toList());
  }
}