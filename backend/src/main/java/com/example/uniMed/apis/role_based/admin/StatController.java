package com.example.uniMed.apis.role_based.admin;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.uniMed.services.role_based.admin.StatService;

@RestController
public class StatController {

    @Autowired
    private StatService statService;

    @GetMapping("/api/stats")
    public Map<String, Object> getStatistics() {
        return statService.getStatistics();
    }
    @GetMapping("/yearly-patient-count")
    public ResponseEntity<Map<Integer, Long>> getYearlyPatientCount() {
        Map<Integer, Long> yearlyPatientCount = statService.getYearlyPatientCount();
        return ResponseEntity.ok(yearlyPatientCount);
    }
     @GetMapping("/monthly-patient-count")
    public ResponseEntity<Map<Integer, Long>> getMonthlyPatientCountByYear(@RequestParam int year) {
        Map<Integer, Long> monthlyPatientCount = statService.getMonthlyPatientCountByYear(year);
        return ResponseEntity.ok(monthlyPatientCount);
    }
    @GetMapping("/yearly-patient-count-by-gender")
    public ResponseEntity<Map<Integer, Map<String, Long>>> getYearlyPatientCountByGender() {
        Map<Integer, Map<String, Long>> yearlyPatientCountByGender = statService.getYearlyPatientCountByGender();
        return ResponseEntity.ok(yearlyPatientCountByGender);
    }

    @GetMapping("/yearly-patient-count-by-role")
    public ResponseEntity<Map<Integer, Map<String, Long>>> getYearlyPatientCountByRole() {
        Map<Integer, Map<String, Long>> yearlyPatientCountByRole = statService.getYearlyPatientCountByRole();
        return ResponseEntity.ok(yearlyPatientCountByRole);
    }

}