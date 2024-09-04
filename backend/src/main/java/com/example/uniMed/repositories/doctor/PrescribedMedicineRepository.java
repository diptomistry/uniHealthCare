package com.example.uniMed.repositories.doctor;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.uniMed.models.medicine.PrescribedMedicine;

public interface PrescribedMedicineRepository extends JpaRepository<PrescribedMedicine, Integer> {
}