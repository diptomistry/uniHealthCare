package com.example.uniMed.services.publics.duty_roster;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.uniMed.models.Doctors;
import com.example.uniMed.models.dutyroster.DayOfWeek;
import com.example.uniMed.models.dutyroster.Slot;
import com.example.uniMed.repositories.publics.duty_roster.DayOfWeekRepository;
import com.example.uniMed.repositories.publics.duty_roster.DoctorRepository;
import com.example.uniMed.repositories.publics.duty_roster.SlotRepository;
import java.util.List;
@Service
public class DutyRosterService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private SlotRepository slotRepository;

    @Autowired
    private DayOfWeekRepository dayOfWeekRepository;

    public Slot assignDoctorsToSlot(Long slotId, List<Long> doctorIds) {
        Slot slot = slotRepository.findById(slotId).orElseThrow(() -> new RuntimeException("Slot not found"));
        List<Doctors> doctors = doctorRepository.findAllById(doctorIds);
        System.out.println(
            "Doctors: " + doctors.size() + ", doctorIds: " + doctorIds.size() + ", slotId: " + slotId
        );
      for (Doctors doctor : doctors) {
            System.out.println("Doctor: " + doctor.getDoctorID());
        }
        slot.setDoctors(doctors);
        return slotRepository.save(slot);
    }

    public List<Slot> getSlotsForDay(Long dayOfWeekId) {
        DayOfWeek dayOfWeek = dayOfWeekRepository.findById(dayOfWeekId)
            .orElseThrow(() -> new RuntimeException("Day of week not found"));
        return dayOfWeek.getSlots();
    }
    public Slot createSlot(String timeSlot, Long dayOfWeekId, List<Long> doctorIds) {
        DayOfWeek dayOfWeek = dayOfWeekRepository.findById(dayOfWeekId)
            .orElseThrow(() -> new RuntimeException("Day of week not found"));
        
        List<Doctors> doctors = doctorRepository.findAllById(doctorIds);
        if (doctors.size() != doctorIds.size()) {
            throw new RuntimeException("Some doctors not found");
        }
        
        Slot slot = new Slot();
        slot.setTimeSlot(timeSlot);
        slot.setDayOfWeek(dayOfWeek);
        slot.setDoctors(doctors);
        
        return slotRepository.save(slot);
    }

    // Additional methods for creating slots, days, and doctors
}
