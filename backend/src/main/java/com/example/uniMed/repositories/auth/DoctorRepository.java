package com.example.uniMed.repositories.auth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.uniMed.models.Doctors;

@Repository
public interface DoctorRepository extends JpaRepository<Doctors, Long> {
    // Additional query methods if needed
}
