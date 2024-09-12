package com.example.uniMed.services.doctors;



import com.example.uniMed.models.Medicines;
import com.example.uniMed.models.User;
import com.example.uniMed.repositories.doctor.MedicineRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
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
        Optional<Medicines> medicine = medicineRepository.findById(medicineID);
        if (medicine.isPresent()) {
            medicineRepository.delete(medicine.get());
            return true;
        }
        return false;
    }

    // Update a medicine
    public Medicines updateMedicine(Integer medicineID, String name, Date entryDate, Date expiryDate, String description, BigDecimal price, Boolean isOutside, Integer stockQuantity, User addedBy) {
        Optional<Medicines> medicineOptional = medicineRepository.findById(medicineID);
        if (medicineOptional.isPresent()) {
            Medicines medicine = medicineOptional.get();
            medicine.setName(name);
            medicine.setEntryDate(entryDate);
            medicine.setExpiryDate(expiryDate);
            medicine.setDescription(description);
            medicine.setPrice(price);
            medicine.setIs_Outside(isOutside);
            medicine.setStockQuantity(stockQuantity);
            medicine.setAddedBy(addedBy);
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
        return medicineRepository.findAll();
    }
}
