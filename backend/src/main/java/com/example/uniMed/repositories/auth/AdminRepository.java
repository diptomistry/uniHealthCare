package com.example.uniMed.repositories.auth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.uniMed.models.Admin;


@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

  
}
