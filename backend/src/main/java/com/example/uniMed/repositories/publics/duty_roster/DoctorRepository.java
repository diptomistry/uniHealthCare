package com.example.uniMed.repositories.publics.duty_roster;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.uniMed.models.Doctors;

public interface DoctorRepository extends JpaRepository<Doctors, Long> {
}