package com.example.uniMed.repositories.doctor;



import com.example.uniMed.models.Appointments;
import com.example.uniMed.models.User;

import java.util.List;
import java.util.Optional;

import org.springframework.ai.vectorstore.filter.FilterExpressionBuilder.Op;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentsRepository extends JpaRepository<Appointments, Integer> {
    Optional<List<Appointments>> findByUserUserID(Integer userId);
   
    @Query("SELECT a.user FROM Appointments a WHERE a.appointmentID = :appointmentID")
    Optional<User> findUserByAppointmentID(@Param("appointmentID") Integer appointmentID);
    
}