package com.example.uniMed.repositories.doctor;


import com.example.uniMed.models.Medicines;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicineRepository extends JpaRepository<Medicines, Integer> {
}