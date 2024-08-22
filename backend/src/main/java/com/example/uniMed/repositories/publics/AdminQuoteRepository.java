package com.example.uniMed.repositories.publics;



import com.example.uniMed.models.AdminQuote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminQuoteRepository extends JpaRepository<AdminQuote, Long> {
}