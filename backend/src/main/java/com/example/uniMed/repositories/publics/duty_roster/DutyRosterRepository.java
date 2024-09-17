package com.example.uniMed.repositories.publics.duty_roster;
import com.example.uniMed.models.dutyroster.DutyRoster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.DayOfWeek;
import java.util.List;
import java.util.Optional;

@Repository
public interface DutyRosterRepository extends JpaRepository<DutyRoster, Long> {
    List<DutyRoster> findByDayOfWeek(DayOfWeek dayOfWeek);
    void deleteBySlotTime(String slotTime);
   @Modifying
    @Query("UPDATE DutyRoster dr SET dr.slotTime = :newSlotTime WHERE dr.slotTime = :oldSlotTime")
    void updateSlotTime(String oldSlotTime, String newSlotTime);
    
}