package com.example.uniMed.services.role_based.dispensary;

import org.checkerframework.checker.units.qual.A;
import org.springframework.ai.vectorstore.filter.FilterExpressionBuilder.Op;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.uniMed.models.Medicines;
import com.example.uniMed.models.DTOs.MedicineRequestDTO;
import com.example.uniMed.models.dispensary.MedicineRequest;
import com.example.uniMed.repositories.auth.UserRepo;
import com.example.uniMed.repositories.doctor.MedicineRepository;
import com.example.uniMed.repositories.role_based.dispensary.MedicineRequestRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class MedicineRequestService {

    @Autowired
    private MedicineRequestRepository medicineRequestRepository;

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private UserRepo userRepo;

    public MedicineRequest createRequest(MedicineRequestDTO request) {
        Long id =Long.parseLong(request.getRequestedBy());
        String status = "PENDING";
        MedicineRequest medicineRequest = new MedicineRequest();
        Optional<com.example.uniMed.models.User> user = userRepo.findById(id);
        if (user.isPresent()) {
            medicineRequest.setRequestedBy(user.get());
        }
        Optional<Medicines> medicine = medicineRepository.findById(Integer.parseInt(Long.toString(request.getMedicineID())));
        if (medicine.isPresent()) {
            medicineRequest.setMedicine(medicine.get());
        }
        if (!medicine.isPresent()){
              throw new RuntimeException(
                "Medicine not found with id: " + request.getMedicineID()
            );
        }
       
        medicineRequest.setStockEndDate(request.getStockEndDate());
        medicineRequest.setRequestDate(Date.from(new Date().toInstant()));
        
        medicineRequest.setQuantity(request.getQuantity());
        medicineRequest.setStatus(status);
        return medicineRequestRepository.save(medicineRequest);
    }

    public List<MedicineRequest> getAllRequests() {
        return medicineRequestRepository.findAll();
    }

    public Optional<MedicineRequest> getRequestById(Long id) {
        return medicineRequestRepository.findById(id);
    }

    public MedicineRequest updateRequestStatus(Long id, String status) {
        Optional<MedicineRequest> optionalRequest = medicineRequestRepository.findById(id);
        if (optionalRequest.isPresent()) {
            MedicineRequest request = optionalRequest.get();
            request.setStatus(status);
            return medicineRequestRepository.save(request);
        }
        return null;
    }
}