package com.example.uniMed.repositories.publics.duty_roster;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.uniMed.models.dutyroster.Slot;

public interface SlotRepository extends JpaRepository<Slot, Long> {
    List<Slot> findByDayOfWeekId(Long dayOfWeekId);
}
