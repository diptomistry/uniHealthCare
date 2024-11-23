package com.example.uniMed.controllers.publics.duty_roster;


import com.example.uniMed.controllers.publics.duty_roster.factories.DutyRosterFactory;
import com.example.uniMed.controllers.publics.duty_roster.templates.*;
import com.example.uniMed.models.dutyroster.DutyRoster;
import com.example.uniMed.services.publics.duty_roster.DutyRosterServices;



import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/duty-roster")
public class DutyRosterControllers {

    @Autowired
    private DutyRosterServices dutyRosterService;

    @PostMapping("/{dutyRosterId}/assign-doctor")
    public ResponseEntity<?> assignDoctorToDutyRoster(@PathVariable Long dutyRosterId, @RequestBody Map<String, Object> payload) {
        List<Integer> doctorId = (List<Integer>) payload.get("doctorId");
        DutyRoster dutyRoster = null;
        for (Integer id : doctorId) {
            DutyRoster upDutyRoster = dutyRosterService.assignDoctorToDutyRoster(dutyRosterId, id);
            dutyRoster = upDutyRoster;
        }
        return ResponseEntity.ok(dutyRoster);
    }

    @GetMapping("/day/{dayOfWeek}")
    public ResponseEntity<List<DutyRoster>> getDutyRosterForDay(@PathVariable DayOfWeek dayOfWeek) {
        // Use the Template Method pattern to fetch and transform data
        DutyRosterTemplate template = new DutyRosterByDay(dutyRosterService, dayOfWeek);
        List<DutyRoster> roster = (List<DutyRoster>) template.executeTemplate();
        return ResponseEntity.ok(roster);
    }

    @PostMapping("/delete-doctor/{dutyRosterId}")
    public ResponseEntity<?> deleteDoctorFromDutyRoster(@PathVariable Long dutyRosterId, @RequestBody Map<String, Object> payload) {
        List<Integer> doctorId = (List<Integer>) payload.get("doctorId");
        DutyRoster dutyRoster = null;
        for (Integer id : doctorId) {
            DutyRoster upDutyRoster = dutyRosterService.deleteDoctorFromDutyRoster(dutyRosterId, id);
            dutyRoster = upDutyRoster;
        }
        return ResponseEntity.ok(dutyRoster);
    }

    /**
     * @swagger
     * /api/duty-roster/create:
     *   post:
     *     summary: Create a new duty roster
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateDutyRosterRequest'
     *     responses:
     *       200:
     *         description: Successfully created duty roster
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/DutyRoster'
     */
    @PostMapping("/create")
    public ResponseEntity<?> createDutyRoster(@RequestBody CreateDutyRosterRequest request) {
        List<DutyRoster> listOfDutyRosters = new ArrayList<>();
        for (DayOfWeek day : DayOfWeek.values()) {
            // Use the Factory Method pattern to create DutyRoster objects
            DutyRoster dutyRoster = DutyRosterFactory.createDutyRoster(day, request.getSlotTime());
            DutyRoster createdRoster = dutyRosterService.createDutyRoster(dutyRoster);
            listOfDutyRosters.add(createdRoster);
        }
        return ResponseEntity.ok(listOfDutyRosters);
    }

    /**
     * @swagger
     * /api/duty-roster/delete/{slotTime}:
     *   delete:
     *     summary: Delete duty roster by slot time
     *     parameters:
     *       - in: path
     *         name: slotTime
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Successfully deleted duty roster
     */
    @DeleteMapping("/delete/{slotTime}")
    public ResponseEntity<?> deleteBySlotTime(@PathVariable String slotTime) {
        dutyRosterService.deleteBySlotTime(slotTime);
        return ResponseEntity.ok("Deleted");
    }

    @PutMapping("/update/{slotTime}")
    public ResponseEntity<?> updateSlotTime(@PathVariable String slotTime, @RequestBody Map<String, Object> payload) {
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