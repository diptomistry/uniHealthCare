package com.example.uniMed.apis.doctors;


import com.example.uniMed.models.Medicines;
import com.example.uniMed.models.User;
import com.example.uniMed.repositories.auth.UserRepo;
import com.example.uniMed.services.doctors.MedicineService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping("/api/medicines")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    @Autowired
    private UserRepo userRepo;

    // Add a new medicine
    @PostMapping("/add")
    public ResponseEntity<Medicines> addMedicine(@RequestBody Map<String, Object> payload) {
        String name = (String) payload.get("name");
        Date entryDate = new Date((Long) payload.get("entryDate"));
        Date expiryDate = new Date((Long) payload.get("expiryDate"));
        String description = (String) payload.get("description");
        BigDecimal price = new BigDecimal((String) payload.get("price"));
        Boolean isOutside = (Boolean) payload.get("isOutside");
        Integer stockQuantity = (Integer) payload.get("stockQuantity");
        Long addedById = Long.parseLong( payload.get("addedBy").toString());
        User addedBy = userRepo.findById(addedById).orElse(null);
     

        Medicines medicine = medicineService.addMedicine(name, entryDate, expiryDate, description, price, isOutside, stockQuantity, addedBy);
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
    public ResponseEntity<Medicines> updateMedicine(@PathVariable Integer id, @RequestBody Map<String, Object> payload) {
        String name = (String) payload.get("name");
        Date entryDate = new Date((Long) payload.get("entryDate"));
        Date expiryDate = new Date((Long) payload.get("expiryDate"));
        String description = (String) payload.get("description");
        BigDecimal price = new BigDecimal((String) payload.get("price"));
        Boolean isOutside = (Boolean) payload.get("isOutside");
        Integer stockQuantity = (Integer) payload.get("stockQuantity");
        Long addedById = Long.parseLong( payload.get("addedBy").toString());
        User addedBy = userRepo.findById(addedById).orElse(null);

        Medicines medicine = medicineService.updateMedicine(id, name, entryDate, expiryDate, description, price, isOutside, stockQuantity, addedBy);
        if (medicine != null) {
            return ResponseEntity.ok(medicine);
        } else {
            return ResponseEntity.notFound().build();
        }
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
        BigDecimal price = new BigDecimal((String) payload.get("price"));
        Medicines medicine = medicineService.updatePrice(id, price);
        if (medicine != null) {
            return ResponseEntity.ok(medicine);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}