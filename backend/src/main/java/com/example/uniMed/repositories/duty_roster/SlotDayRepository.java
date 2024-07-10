package com.example.uniMed.repositories.duty_roster;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.uniMed.models.SlotDay;

@Repository
public interface SlotDayRepository extends JpaRepository<SlotDay, Long> {
}