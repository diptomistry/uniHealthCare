package com.example.uniMed.repositories.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.example.uniMed.models.Student;


@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query("SELECT s FROM Student s WHERE s.userID = :userId")
    Student findByUserId(@Param("userId") Long userId);

    @Modifying
    @Query("UPDATE Student s SET s.department = :department WHERE s.userID = :studentId")
    void updateDepartment(@Param("studentId") Long studentId, @Param("department") String department);

    @Modifying
    @Query("UPDATE Student s SET s.session = :session WHERE s.userID = :studentId")
    void updateSession(@Param("studentId") Long studentId, @Param("session") String session);

    @Modifying
    @Query("UPDATE Student s SET s.registrationNo = :registrationNo WHERE s.userID = :studentId")
    void updateRegistrationNo(@Param("studentId") Long studentId, @Param("registrationNo") String registrationNo);
}