package com.example.uniMed.repositories.role_based.dispensary;



import com.example.uniMed.models.dispensary.DispenseRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DispenseRequestRepository extends JpaRepository<DispenseRequest, Long> {
}
