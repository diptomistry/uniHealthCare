package com.example.uniMed.services.publics.duty_roster;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.example.uniMed.models.Doctors;
import com.example.uniMed.models.dutyroster.DayOfWeek;
import com.example.uniMed.models.dutyroster.Slot;
import com.example.uniMed.repositories.publics.duty_roster.DayOfWeekRepository;
import com.example.uniMed.repositories.publics.duty_roster.DoctorRepository;
import com.example.uniMed.repositories.publics.duty_roster.SlotRepository;
import java.util.List;
import java.util.Map;
@Service
public class DutyRosterService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private DayOfWeekRepository dayOfWeekRepository;

    @Autowired
    private SlotRepository slotRepository;

    // Create a new slot
    public Slot createSlot(String timeSlot, Long dayOfWeekId, List<Long> doctorIds) {
        DayOfWeek dayOfWeek = dayOfWeekRepository.findById(dayOfWeekId)
                .orElseThrow(() -> new RuntimeException("Day of week not found"));

        List<Doctors> doctors = doctorRepository.findAllById(doctorIds);

        Slot slot = new Slot();
        slot.setTimeSlot(timeSlot);
        slot.setDayOfWeek(dayOfWeek);
        slot.setDoctors(doctors);

        return slotRepository.save(slot);
    }

    // Get all slots for a specific day
    public List<Slot> getSlotsByDay(Long dayOfWeekId) {
        return slotRepository.findByDayOfWeekId(dayOfWeekId);
    }

    // Get the full duty roster
    public List<DayOfWeek> getFullDutyRoster() {
        return dayOfWeekRepository.findAll();
    }
}