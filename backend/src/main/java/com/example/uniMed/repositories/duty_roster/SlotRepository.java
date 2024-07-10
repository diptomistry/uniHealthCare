package com.example.uniMed.repositories.duty_roster;

// SlotRepository.java
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.uniMed.models.Slot;

@Repository
public interface SlotRepository extends JpaRepository<Slot, Long> {
}
