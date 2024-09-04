package com.example.uniMed.repositories.doctor;



import com.example.uniMed.models.Appointments;

import java.util.List;
import java.util.Optional;

import org.springframework.ai.vectorstore.filter.FilterExpressionBuilder.Op;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentsRepository extends JpaRepository<Appointments, Integer> {
    Optional<List<Appointments>> findByUserUserID(Integer userId);
}