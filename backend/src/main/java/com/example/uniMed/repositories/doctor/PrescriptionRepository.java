package com.example.uniMed.repositories.doctor;




import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.uniMed.models.medicine.Prescription;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Integer> {
}