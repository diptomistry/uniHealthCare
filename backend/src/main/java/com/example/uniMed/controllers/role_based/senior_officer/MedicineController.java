package com.example.uniMed.controllers.role_based.senior_officer;

import com.example.uniMed.models.Medicines;
import com.example.uniMed.models.User;
import com.example.uniMed.repositories.auth.UserRepo;
import com.example.uniMed.services.role_based.senior_officer.MedicineService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Map;
import com.example.uniMed.models.DTOs.MedicinesDTO;

import com.example.uniMed.models.DTOs.Me.MedicineDTO1;

@RestController
@RequestMapping("/api/medicines")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    @Autowired
    private UserRepo userRepo;

    // Add a new medicine
    @PostMapping("/add")
    public ResponseEntity<MedicinesDTO> addMedicine(@RequestBody MedicineDTO1 medicineDTO) {
        System.out.println(medicineDTO.toString());

        MedicinesDTO medicine = medicineService.addMedicine(medicineDTO);
        return ResponseEntity.ok(medicine);
    }

    // Delete a medicine by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteMedicine(@PathVariable Integer id) {
        boolean isDeleted = medicineService.deleteMedicine(id);
        if (isDeleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Update a medicine
    @PutMapping("/update/{id}")
    public ResponseEntity<MedicinesDTO> updateMedicine(@PathVariable Integer id, @RequestBody MedicineDTO1 medicineDTO) {
        MedicinesDTO medicine = medicineService.updateMedicine(id, medicineDTO);
        return ResponseEntity.ok(medicine);
    }
    // Update stock quantity
    @PatchMapping("/update-stock/{id}")
    public ResponseEntity<Medicines> updateStock(@PathVariable Integer id, @RequestBody Map<String, Object> payload) {
        Integer stockQuantity = (Integer) payload.get("stockQuantity");
        Medicines medicine = medicineService.updateStock(id, stockQuantity);
        if (medicine != null) {
            return ResponseEntity.ok(medicine);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Update price
    @PatchMapping("/update-price/{id}")
    public ResponseEntity<Medicines> updatePrice(@PathVariable Integer id, @RequestBody Map<String, Object> payload) {
       
        Medicines medicine = medicineService.updatePrice(id, 0L);
        if (medicine != null) {
            return ResponseEntity.ok(medicine);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Get all medicines
    @GetMapping("/all")
    public ResponseEntity<Iterable<MedicinesDTO>> getAllMedicines() {
        Iterable<MedicinesDTO> medicines = medicineService.getAllMedicines();
        return ResponseEntity.ok(medicines);
    }
}