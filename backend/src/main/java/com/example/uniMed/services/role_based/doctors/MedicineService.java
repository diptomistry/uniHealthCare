package com.example.uniMed.services.role_based.doctors;



import com.example.uniMed.models.Medicines;
import com.example.uniMed.models.User;
import com.example.uniMed.repositories.doctor.MedicineRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    // Add a new medicine
    public Medicines addMedicine(String name, Date entryDate, Date expiryDate, String description, BigDecimal price, Boolean isOutside, Integer stockQuantity, User addedBy) {
        Medicines medicine = new Medicines();
        Date date = new Date();
        medicine.setName(name);
        medicine.setEntryDate(entryDate!=null? entryDate : date);
        medicine.setExpiryDate(expiryDate);
        medicine.setDescription(description);
        medicine.setPrice(price);
        medicine.setIs_Outside(isOutside);
        medicine.setStockQuantity(stockQuantity);
        medicine.setAddedBy(addedBy);
        return medicineRepository.save(medicine);
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

    // Update a medicine
    public Medicines updateMedicine(Integer medicineID, String name, Date entryDate, Date expiryDate, String description, BigDecimal price, Boolean isOutside, Integer stockQuantity, User addedBy) {
        Optional<Medicines> medicineOptional = medicineRepository.findById(medicineID);
        if (medicineOptional.isPresent()) {
            Medicines medicine = medicineOptional.get();
            if (name != null){
            medicine.setName(name);}
            if (entryDate != null) {
                medicine.setEntryDate(entryDate);
            }
            if (expiryDate != null){
            medicine.setExpiryDate(expiryDate);}
            if (description != null){
            medicine.setDescription(description);}
            if (price != null)

          {  medicine.setPrice(price);}
            if (isOutside != null)
          {  medicine.setIs_Outside(isOutside);}
            if (stockQuantity != null)
           { medicine.setStockQuantity(stockQuantity);}
            if (addedBy != null)
          {  medicine.setAddedBy(addedBy);}
            return medicineRepository.save(medicine);
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
    public Medicines updatePrice(Integer medicineID, BigDecimal price) {
        Optional<Medicines> medicineOptional = medicineRepository.findById(medicineID);
        if (medicineOptional.isPresent()) {
            Medicines medicine = medicineOptional.get();
            medicine.setPrice(price);
            return medicineRepository.save(medicine);
        }
        return null;
    }
    //get all medicines
    public Iterable<Medicines> getAllMedicines() {
        List <Medicines> medicines = medicineRepository.findAll();
        List <Medicines> activeMedicines = new ArrayList<>();
        for (Medicines medicine : medicines) {
            boolean isDeleted = medicine.getIsDeleted() != null ? medicine.getIsDeleted() : false;
            if (!isDeleted)

             {   activeMedicines.add(medicine);}
           
        }
        return activeMedicines;
    }
}
