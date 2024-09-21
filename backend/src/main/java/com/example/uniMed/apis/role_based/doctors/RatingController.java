package com.example.uniMed.apis.role_based.doctors;



import com.example.uniMed.models.Doctors;

import com.example.uniMed.models.User;
import com.example.uniMed.models.DTOs.RatingDTO;
import com.example.uniMed.models.rating.Rating;
import com.example.uniMed.repositories.auth.UserRepo;
import com.example.uniMed.repositories.doctor.RatingRepository;
import com.example.uniMed.repositories.publics.duty_roster.DoctorRepository;
import com.example.uniMed.services.role_based.doctors.RatingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

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
    public List<Rating> getRatingsByDoctor(@PathVariable Long doctorId) {
        Doctors doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        return ratingRepository.findByDoctor(doctor);
    }

  @PostMapping("/doctor/{doctorId}/user/{userId}")
public Rating addRating(@PathVariable Long doctorId, @PathVariable Long userId, 
                        @RequestBody  RatingDTO ratingDTO) {
    Rating rating = new Rating();
    rating.setDoctor(doctorRepository.findById(doctorId).orElseThrow(() -> new RuntimeException("Doctor not found")));
    rating.setUser(userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found")));
    rating.setRating(ratingDTO.getRating());
    rating.setReview(ratingDTO.getReview());
    rating.setCreatedAt(LocalDateTime.now());
    return ratingRepository.save(rating);
}
}