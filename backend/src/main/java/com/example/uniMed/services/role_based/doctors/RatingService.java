package com.example.uniMed.services.role_based.doctors;

import com.example.uniMed.models.rating.Rating;
import com.example.uniMed.repositories.doctor.RatingRepository;
import com.example.uniMed.models.Doctors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    public List<Rating> getRatingsByDoctor(Doctors doctor) {
        return ratingRepository.findByDoctor(doctor);
    }

    public Rating addRating(Rating rating) {
        return ratingRepository.save(rating);
    }
    public ResponseEntity<?> deleteRating(Long id) {
        ratingRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}