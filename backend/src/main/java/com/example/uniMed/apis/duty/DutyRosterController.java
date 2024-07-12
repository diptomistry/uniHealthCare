
package com.example.uniMed.apis.duty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalTime;

import com.example.uniMed.models.DoctorSlot;
import com.example.uniMed.models.Doctors;
import com.example.uniMed.models.DutyRoster;
import com.example.uniMed.models.Slot;
import com.example.uniMed.models.SlotDay;
import com.example.uniMed.repositories.auth.DoctorRepository;
import com.example.uniMed.repositories.duty_roster.DoctorSlotRepository;
import com.example.uniMed.repositories.duty_roster.DutyRosterRepository;
import com.example.uniMed.repositories.duty_roster.SlotDayRepository;
import com.example.uniMed.repositories.duty_roster.SlotRepository;

import java.util.*;

@RestController
@RequestMapping("/api")
public class DutyRosterController {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private SlotRepository slotRepository;
    @Autowired
private SlotDayRepository slotDayRepository;

    @Autowired
    private DutyRosterRepository dutyRosterRepository;

    @Autowired
    private DoctorSlotRepository doctorSlotRepository;

    @PostMapping("/duty-roster")
    public ResponseEntity<?> createDutyRoster(@RequestBody Map<String, Long> request) {
        try {
            Long doctorId = request.get("doctorId");
            Long slotId = request.get("slotId");

            Doctors doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
            Slot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new RuntimeException("Slot not found"));

            DutyRoster dutyRoster = new DutyRoster();
            dutyRoster.setDoctor(doctor);
            dutyRoster = dutyRosterRepository.save(dutyRoster);

            DoctorSlot doctorSlot = new DoctorSlot();
           
            doctorSlot.setSlot(slot);
            doctorSlotRepository.save(doctorSlot);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Duty roster created successfully",
                "dutyRosterId", dutyRoster.getDutyRosterId()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        }
    }

    @GetMapping("/get-duty-roster")
    public ResponseEntity<?> getDutyRoster() {
        try {
            List<Map<String, Object>> results = doctorSlotRepository.getDutyRoster();
            List<Map<String, Object>> dutyRoster = new ArrayList<>();
    
            for (Map<String, Object> row : results) {
                Map<String, Object> doctorEntry = dutyRoster.stream()
                    .filter(d -> d.get("DoctorID").equals(row.get("doctorId")))
                    .findFirst()
                    .orElse(null);
    
                if (doctorEntry == null) {
                    doctorEntry = new HashMap<>();
                    doctorEntry.put("DoctorID", row.get("doctorId"));
                    doctorEntry.put("DoctorName", row.get("doctorName"));
                    doctorEntry.put("DepartmentName", row.get("departmentName"));
                    doctorEntry.put("Slots", new ArrayList<>());
                    dutyRoster.add(doctorEntry);
                }
    
                Map<String, Object> slot = new HashMap<>();
                slot.put("SlotID", row.get("slotId"));
                slot.put("StartTime", row.get("startTime"));
                slot.put("EndTime", row.get("endTime"));
                slot.put("Days", ((String) row.get("days")).split(","));
    
                ((List<Map<String, Object>>) doctorEntry.get("Slots")).add(slot);
            }
    
            return ResponseEntity.ok(Map.of(
                "success", true,
                "dutyRoster", dutyRoster
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        }
    }
    @PostMapping("/assign-slot")
    public ResponseEntity<?> assignSlot(@RequestBody Map<String, Object> request) {
        try {
            Long doctorId = Long.parseLong(request.get("doctorId").toString());
            List<Long> slotIds = (List<Long>) request.get("slotIds");

            Doctors doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

            for (Long slotId : slotIds) {
                Slot slot = slotRepository.findById(slotId)
                    .orElseThrow(() -> new RuntimeException("Slot not found"));

                DoctorSlot doctorSlot = new DoctorSlot();
                doctorSlot.setDoctor(doctor);
                doctorSlot.setSlot(slot);
                doctorSlotRepository.save(doctorSlot);
            }

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Slot assigned successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "An error occurred while assigning the slot"
            ));
        }
    }

    @PostMapping("/create-slot")
    public ResponseEntity<?> createSlot(@RequestBody Map<String, Object> request) {
        try {
            String startTime = (String) request.get("startTime");
            String endTime = (String) request.get("endTime");
            List<String> selectedDays = (List<String>) request.get("selectedDays");

            Slot slot = new Slot();
            LocalTime parsedStartTime = LocalTime.parse(startTime);
LocalTime parsedEndTime = LocalTime.parse(endTime);

            slot.setStartTime(parsedStartTime);
            slot.setEndTime(parsedEndTime);
          
            slot = slotRepository.save(slot);

            for (String day : selectedDays) {
                SlotDay slotDay = new SlotDay();
                slotDay.setSlot(slot);
                slotDay.setDay(day);
                slotDayRepository.save(slotDay);
            }

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Slot created successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        }
    }

    @GetMapping("/slots")
    public ResponseEntity<?> getSlots() {
        try {
            List<Slot> slots = slotRepository.findAll();
            List<Map<String, Object>> slotsArray = new ArrayList<>();

            for (Slot slot : slots) {
                Map<String, Object> slotMap = new HashMap<>();
                slotMap.put("SlotID", slot.getSlotId());
                slotMap.put("StartTime", slot.getStartTime());
                slotMap.put("EndTime", slot.getEndTime());
                slotMap.put("Days", slot.getSlotDays().stream().map(SlotDay::getDay).toList());
                slotsArray.add(slotMap);
            }

            return ResponseEntity.ok(Map.of(
                "success", true,
                "slots", slotsArray
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        }
    }
}