package com.example.uniMed.repositories.doctor;


import com.example.uniMed.models.Medicines;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicineRepository extends JpaRepository<Medicines, Integer> {

    @Query("SELECT COUNT(m) FROM Medicines m WHERE m.stockQuantity = 0 AND m.isDeleted = false")
    long countOutOfStock();

    @Query("SELECT COUNT(m) FROM Medicines m WHERE m.stockQuantity > 0 AND m.isDeleted = false")
    long countAvailable();

    @Query("SELECT COUNT(m) FROM Medicines m WHERE m.isDeleted = false")
    long countTotal();

    @Query("SELECT COUNT(m) FROM Medicines m WHERE m.expiryDate < CURRENT_DATE AND m.isDeleted = false")
    long countExpired();

    @Query("SELECT COUNT(m) FROM Medicines m WHERE m.stockQuantity < 10 AND m.isDeleted = false")
    long countLowStock();
}