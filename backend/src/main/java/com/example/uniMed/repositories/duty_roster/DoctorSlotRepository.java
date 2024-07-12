package com.example.uniMed.repositories.duty_roster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.uniMed.models.DoctorSlot;

import java.util.List;
import java.util.Map;

@Repository
public interface DoctorSlotRepository extends JpaRepository<DoctorSlot, Long> {
    @Query("SELECT NEW map(d.doctorID as doctorId, u.name as doctorName, dep.name as departmentName, " +
           "s.slotId as slotId, s.startTime as startTime, s.endTime as endTime, " +
           "GROUP_CONCAT(DISTINCT sd.day) as days) " +
           "FROM DoctorSlot ds " +
           "JOIN ds.doctor d " +
           "JOIN d.user u " +
           "JOIN d.department dep " +
           "JOIN ds.slot s " +
           "LEFT JOIN SlotDay sd ON sd.slot = s " +
           "GROUP BY d.doctorID, s.slotId " +
           "ORDER BY d.doctorID ASC, s.startTime ASC")
    List<Map<String, Object>> getDutyRoster();
}