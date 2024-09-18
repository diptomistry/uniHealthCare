package com.example.uniMed.repositories.role_based.dispensary;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.uniMed.models.dispensary.MedicineRequest;

public interface MedicineRequestRepository extends JpaRepository<MedicineRequest, Long> {
}