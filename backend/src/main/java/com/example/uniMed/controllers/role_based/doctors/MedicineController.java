package com.example.uniMed.controllers.role_based.doctors;

import com.example.uniMed.models.Medicines;
import com.example.uniMed.models.User;
import com.example.uniMed.repositories.auth.UserRepo;
import com.example.uniMed.services.role_based.doctors.MedicineService;

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
    public ResponseEntity<MedicinesDTO> addMedicine(@RequestBody Map<String, Object> payload) {
        String name = (String) payload.get("name");
        Date entryDate = new Date((Long) payload.get("entryDate"));
        Date expiryDate = new Date((Long) payload.get("expiryDate"));
        String description = (String) payload.get("description");
        Long price = Long.parseLong(payload.get("price").toString());
        Boolean isOutside = (Boolean) payload.get("isOutside");
        Integer stockQuantity = (Integer) payload.get("stockQuantity");
        Long addedById = Long.parseLong(payload.get("addedBy").toString());
        User addedBy = userRepo.findById(addedById).orElse(null);

        MedicinesDTO medicine = medicineService.addMedicine(name, entryDate, expiryDate, description, price, isOutside,
                stockQuantity, addedBy);
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