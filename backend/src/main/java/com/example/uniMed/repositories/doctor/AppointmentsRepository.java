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

    long countByStatus(String status);
    
    @Query("SELECT YEAR(a.appointmentDateTime) AS year, COUNT(a) AS count " +
    "FROM Appointments a " +
    "WHERE a.status IN ('prescribed', 'dispensed') " +
    "GROUP BY YEAR(a.appointmentDateTime)")
List<Object[]> findYearlyPatientCount();

@Query("SELECT MONTH(a.appointmentDateTime) AS month, COUNT(a) AS count " +
"FROM Appointments a " +
"WHERE YEAR(a.appointmentDateTime) = :year AND a.status IN ('prescribed', 'dispensed') " +
"GROUP BY MONTH(a.appointmentDateTime)")
List<Object[]> findMonthlyPatientCountByYear(int year);


@Query("SELECT YEAR(a.appointmentDateTime) AS year, a.user.sex AS sex, COUNT(a) AS count " +
"FROM Appointments a " +
"WHERE a.status IN ('prescribed', 'dispensed') " +
"GROUP BY YEAR(a.appointmentDateTime), a.user.sex")
List<Object[]> findYearlyPatientCountByGender();

@Query("SELECT YEAR(a.appointmentDateTime) AS year, a.user.role.roleName AS role, COUNT(a) AS count " +
"FROM Appointments a " +
"WHERE a.status IN ('prescribed', 'dispensed') " +
"GROUP BY YEAR(a.appointmentDateTime), a.user.role.roleName")
List<Object[]> findYearlyPatientCountByRole();
    
}