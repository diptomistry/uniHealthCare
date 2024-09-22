package com.example.uniMed.repositories.doctor;


import com.example.uniMed.models.Doctors;
import com.example.uniMed.models.rating.Rating;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByDoctor(Doctors doctor);
    List<Rating> findByDoctorUserIDAndUserUserID(Long doctorId, Long userId);
}