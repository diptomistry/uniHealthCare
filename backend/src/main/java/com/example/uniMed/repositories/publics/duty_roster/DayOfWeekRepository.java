package com.example.uniMed.repositories.publics.duty_roster;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.uniMed.models.dutyroster.DayOfWeek;

public interface DayOfWeekRepository extends JpaRepository<DayOfWeek, Long> {
    boolean existsByName(String day);
}