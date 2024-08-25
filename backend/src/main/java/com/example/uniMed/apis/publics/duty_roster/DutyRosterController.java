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
    @Autowired
    private DayOfWeekRepository dayOfWeekRepository;

    @PostMapping("/slots/{slotId}/doctors")
    public ResponseEntity<Slot> assignDoctorsToSlot(
            @PathVariable Long slotId,
            @RequestBody Map<String, List<Long>> request) {
        List<Long> doctorIds = request.get("doctorIds");
        
        Slot updatedSlot = dutyRosterService.assignDoctorsToSlot(slotId, doctorIds);
        return ResponseEntity.ok(updatedSlot);
    }

    @GetMapping("/days/{dayOfWeekId}/slots")
    public ResponseEntity<List<Slot>> getSlotsForDay(@PathVariable Long dayOfWeekId) {
        List<Slot> slots = dutyRosterService.getSlotsForDay(dayOfWeekId);
        return ResponseEntity.ok(slots);
    }
    @PostMapping("/slots")
public ResponseEntity<Slot> createSlot(
        @RequestBody SlotRequest slotRequest) {
    Slot createdSlot = dutyRosterService.createSlot(
        slotRequest.getTimeSlot(), 
        slotRequest.getDayOfWeekId(), 
        slotRequest.getDoctorIds());
        
    
    return ResponseEntity.status(HttpStatus.CREATED).body(createdSlot);
}
@GetMapping("/slots")
public ResponseEntity<List<Slot>> getAllSlots() {
    List<Slot> slots = dutyRosterService.getAllSlots();
    return ResponseEntity.ok(slots);
}

@GetMapping("/slots-by-week")
public ResponseEntity<List<DayOfWeek>> getSlotsByWeek() {
    List<DayOfWeek> daysOfWeek = dayOfWeekRepository.findAll();
    return ResponseEntity.ok(daysOfWeek);
}
    // Additional endpoints for managing doctors, slots, and days of the week
}