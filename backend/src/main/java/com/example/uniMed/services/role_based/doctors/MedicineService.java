package com.example.uniMed.services.role_based.doctors;

import com.example.uniMed.models.Medicines;
import com.example.uniMed.models.User;
import com.example.uniMed.repositories.doctor.MedicineRepository;

import org.checkerframework.checker.units.qual.s;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.uniMed.models.DTOs.MedicinesDTO;
import com.example.uniMed.models.DTOs.Me.MedicineDTO1;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import com.example.uniMed.models.DTOs.MedicinesDTO;

@Service
public class MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    // Add a new medicine
    public MedicinesDTO addMedicine(String name, Date entryDate, Date expiryDate, String description, Long price,
            Boolean isOutside, Integer stockQuantity, User addedBy) {
        Medicines medicine = new Medicines();
        Date date = new Date();
        medicine.setName(name);
        medicine.setEntryDate(entryDate != null ? entryDate : date);
        medicine.setExpiryDate(expiryDate);
        medicine.setDescription(description);
        medicine.setPrice(price);
        medicine.setIs_Outside(isOutside);
        medicine.setStockQuantity(stockQuantity);
        medicine.setAddedBy(addedBy);
        return medicineRepository.save(medicine).toDTO(medicine);
    }

    // Delete a medicine by ID
    public boolean deleteMedicine(Integer medicineID) {
        Medicines medicine = medicineRepository.findById(medicineID).get();
        if (medicine != null) {
            medicine.setIsDeleted(true);
            medicineRepository.save(medicine);
            return true;
        }

        return false;
    }

    public MedicinesDTO updateMedicine(Integer medicineID, MedicineDTO1 medicineDTO) {
        System.out.println(medicineID);
        Optional<Medicines> medicineOptional = medicineRepository.findById(medicineID);
        if (medicineOptional.isPresent()) {
         
            Medicines medicine = medicineOptional.get();
            System.out.println(medicineDTO.getName());
            System.out.println("Name");
            System.out.println(medicineDTO.getEntryDate());
            System.out.println("Entry Date");
            System.out.println(medicineDTO.getExpiryDate());
            System.out.println("Expiry Date");
            System.out.println(medicineDTO.getDescription());
            System.out.println("Description");
            System.out.println(medicineDTO.getPrice());
            System.out.println("Price");
            System.out.println(medicineDTO.getIsOutside());
            System.out.println("Is Outside");
            System.out.println(medicineDTO.getStockQuantity());
            System.out.println("Stock Quantity");
    
            if (medicineDTO.getName() != null) {
                medicine.setName(medicineDTO.getName());
            }
            if (medicineDTO.getEntryDate() != null) {
                medicine.setEntryDate(medicineDTO.getEntryDate());
            }
            if (medicineDTO.getExpiryDate() != null) {
                medicine.setExpiryDate(medicineDTO.getExpiryDate());
            }
            if (medicineDTO.getDescription() != null) {
                medicine.setDescription(medicineDTO.getDescription());
            }
            if (medicineDTO.getPrice() != null) {
                medicine.setPrice(medicineDTO.getPrice());
            }
            if (medicineDTO.getIsOutside() != null) {
                medicine.setIs_Outside(medicineDTO.getIsOutside());
            }
            if (medicineDTO.getStockQuantity() != null) {
                System.out.println(medicineDTO.getStockQuantity());
                System.out.println("Stock Quantity");
                medicine.setStockQuantity(medicineDTO.getStockQuantity());
            }
          
    
            Medicines updatedMedicine = medicineRepository.save(medicine);
            return updatedMedicine.toDTO(updatedMedicine);
        }
        return null;
    }
    // Update stock quantity
    public Medicines updateStock(Integer medicineID, Integer stockQuantity) {
        Optional<Medicines> medicineOptional = medicineRepository.findById(medicineID);
        if (medicineOptional.isPresent()) {
            Medicines medicine = medicineOptional.get();
            medicine.setStockQuantity(stockQuantity);
            return medicineRepository.save(medicine);
        }
        return null;
    }

    // Update price
    public Medicines updatePrice(Integer medicineID, Long price) {
        Optional<Medicines> medicineOptional = medicineRepository.findById(medicineID);
        if (medicineOptional.isPresent()) {
            Medicines medicine = medicineOptional.get();
            medicine.setPrice(price);
            return medicineRepository.save(medicine);
        }
        return null;
    }

    // get all medicines
    public Iterable<MedicinesDTO> getAllMedicines() {
        List<Medicines> medicines = medicineRepository.findAll();
        List<Medicines> activeMedicines = new ArrayList<>();
        List<MedicinesDTO> medicineDTOs = new ArrayList<>();
        for (Medicines medicine : medicines) {
            boolean isDeleted = medicine.getIsDeleted() != null ? medicine.getIsDeleted() : false;
            if (!isDeleted)

            {
                activeMedicines.add(medicine);
                medicineDTOs.add(medicine.toDTO(medicine));
            }

        }
        return medicineDTOs;
    }
}
