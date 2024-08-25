package com.example.uniMed.apis.publics.duty_roster;
import com.example.uniMed.models.dutyroster.DayOfWeek;
import com.example.uniMed.models.dutyroster.Slot;
import com.example.uniMed.repositories.publics.duty_roster.DayOfWeekRepository;
import com.example.uniMed.services.publics.duty_roster.DutyRosterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/api/roster")
public class DutyRosterController {

    @Autowired
    private DutyRosterService dutyRosterService;

    // DTO for creating a slot
    public static class SlotRequest {
        private String timeSlot;
        private Long dayOfWeekId;
        private List<Long> doctorIds;
        public String getTimeSlot() {
            return timeSlot;
        }
        public void setTimeSlot(String timeSlot) {
            this.timeSlot = timeSlot;
        }
        public Long getDayOfWeekId() {
            return dayOfWeekId;
        }
        public void setDayOfWeekId(Long dayOfWeekId) {
            this.dayOfWeekId = dayOfWeekId;
        }
        public List<Long> getDoctorIds() {
            return doctorIds;
        }
        public void setDoctorIds(List<Long> doctorIds) {
            this.doctorIds = doctorIds;
        }
        

       
    }

    @PostMapping("/slots")
    public ResponseEntity<Slot> createSlot(@RequestBody SlotRequest slotRequest) {
        Slot slot = dutyRosterService.createSlot(
                slotRequest.getTimeSlot(),
                slotRequest.getDayOfWeekId(),
                slotRequest.getDoctorIds()
        );
        return ResponseEntity.ok(slot);
    }

    @GetMapping("/days/{dayOfWeekId}/slots")
    public ResponseEntity<List<Slot>> getSlotsByDay(@PathVariable Long dayOfWeekId) {
        List<Slot> slots = dutyRosterService.getSlotsByDay(dayOfWeekId);
        return ResponseEntity.ok(slots);
    }

    @GetMapping("/full-roster")
    public ResponseEntity<List<DayOfWeek>> getFullDutyRoster() {
        List<DayOfWeek> roster = dutyRosterService.getFullDutyRoster();
        return ResponseEntity.ok(roster);
    }
}