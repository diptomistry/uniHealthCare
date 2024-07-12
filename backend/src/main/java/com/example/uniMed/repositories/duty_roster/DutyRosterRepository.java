package com.example.uniMed.repositories.duty_roster;

// DutyRosterRepository.java
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.uniMed.models.DutyRoster;

@Repository
public interface DutyRosterRepository extends JpaRepository<DutyRoster, Long> {
}
