package com.example.uniMed.controllers.publics.duty_roster;
import com.example.uniMed.models.dutyroster.DutyRoster;
import com.example.uniMed.services.publics.duty_roster.DutyRosterServices;

import jakarta.persistence.criteria.CriteriaBuilder.In;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.checkerframework.checker.units.qual.s;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/duty-roster")
public class DutyRosterControllers {
    @Autowired
    private DutyRosterServices dutyRosterService;

    @PostMapping("/{dutyRosterId}/assign-doctor")
    public ResponseEntity<?> assignDoctorToDutyRoster(@PathVariable Long dutyRosterId, @RequestBody Map<String, Object> payload) {
        List<Integer> doctorId = (List<Integer>) payload.get("doctorId");
       DutyRoster dutyRoster=null;
        for (Integer id : doctorId) {
            DutyRoster upDutyRoster = dutyRosterService.assignDoctorToDutyRoster(dutyRosterId, id);
            dutyRoster = upDutyRoster;

        }

        
        return ResponseEntity.ok(dutyRoster);
    }

    @GetMapping("/day/{dayOfWeek}")
    public ResponseEntity<List<DutyRoster>> getDutyRosterForDay(@PathVariable DayOfWeek dayOfWeek) {
        List<DutyRoster> roster = dutyRosterService.getDutyRosterForDay(dayOfWeek);
        return ResponseEntity.ok(roster);
    }

    @PostMapping("/delete-doctor/{dutyRosterId}")
    public ResponseEntity<?> deleteDoctorFromDutyRoster(@PathVariable Long dutyRosterId, @RequestBody Map<String, Object> payload) {
        System.out.println("delete doctor");
        System.out.println(dutyRosterId);
        List<Integer> doctorId = (List<Integer>) payload.get("doctorId");
        DutyRoster dutyRoster=null;
        for (Integer id : doctorId) {
            DutyRoster upDutyRoster = dutyRosterService.deleteDoctorFromDutyRoster(dutyRosterId, id);
            dutyRoster = upDutyRoster;

        }

        
        return ResponseEntity.ok(dutyRoster);
    }
    

    // @GetMapping("/day/{dayOfWeek}/slot/{slotNumber}")
    // public ResponseEntity<DutyRoster> getDutyRosterForDayAndSlot(
    //         @PathVariable DayOfWeek dayOfWeek,
    //         @PathVariable Integer slotNumber) {
    //     DutyRoster roster = dutyRosterService.getDutyRosterForDayAndSlot(dayOfWeek, slotNumber);
    //     return ResponseEntity.ok(roster);
    // }

    @PostMapping("/create")
    public ResponseEntity<?> createDutyRoster( @RequestBody CreateDutyRosterRequest request) {
        List<DutyRoster> listODutyRosters = new ArrayList<>();
        for (DayOfWeek day : DayOfWeek.values()) {
            DutyRoster dutyRoster = new DutyRoster();
            dutyRoster.setDayOfWeek(day);
          
            dutyRoster.setSlotTime(request.getSlotTime());
            
            DutyRoster createdRoster = dutyRosterService.createDutyRoster(dutyRoster);
            listODutyRosters.add(createdRoster);
        }
       
        return ResponseEntity.ok(listODutyRosters);
    }
    @DeleteMapping("/delete/{slotTime}")
    public ResponseEntity<?> deleteBySlotTime (@PathVariable String slotTime) {
        dutyRosterService.deleteBySlotTime(slotTime);
        return ResponseEntity.ok("Deleted");
    }
    @PutMapping("/update/{slotTime}")
    public ResponseEntity<?> updateSlotTime (@PathVariable String slotTime, @RequestBody Map<String, Object> payload) {
        String newSlotTime = (String) payload.get("newSlotTime");
       return dutyRosterService.updateSlotTime(slotTime, newSlotTime);
        
    }
    @GetMapping("/table")
    public ResponseEntity<List<DutyRosterTableDTO>> getDutyRosterTable() {
        List<DutyRosterTableDTO> table = dutyRosterService.getDutyRosterTable();
        return ResponseEntity.ok(table);
    }
    // Add more endpoints as needed
}
