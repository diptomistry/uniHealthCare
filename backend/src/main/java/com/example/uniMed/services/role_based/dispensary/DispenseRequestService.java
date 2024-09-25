package com.example.uniMed.services.role_based.dispensary;

import com.example.uniMed.models.DTOs.DispenseRequestDTO;
import com.example.uniMed.models.dispensary.DispenseRequest;
import com.example.uniMed.models.dispensary.DispensedMedicine;
import com.example.uniMed.models.dispensary.MedicineRequest;

import com.example.uniMed.models.Appointments;
import com.example.uniMed.models.Medicines;
import com.example.uniMed.repositories.doctor.AppointmentsRepository;
import com.example.uniMed.repositories.doctor.MedicineRepository;
import com.example.uniMed.repositories.role_based.dispensary.DispenseRequestRepository;
import com.example.uniMed.repositories.role_based.dispensary.MedicineRequestRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class DispenseRequestService {

    @Autowired
    private DispenseRequestRepository dispenseRequestRepository;

    @Autowired
    private MedicineRepository medicinesRepository;

    @Autowired
    private AppointmentsRepository appointmentRepository;

    @Autowired
    private MedicineRequestRepository medicineRequestRepository;

    @Transactional
    public String createDispenseRequest(DispenseRequestDTO requestDTO) {
        try {
            // Validate appointment
            Optional<Appointments> appointmentOptional = appointmentRepository
                    .findById(Integer.parseInt(requestDTO.getAppointmentId().toString()));
            if (!appointmentOptional.isPresent()) {
                throw new RuntimeException("Appointment not found");
            }
            Appointments appointment = appointmentOptional.get();

            // Prepare dispensed medicines list
            List<DispensedMedicine> dispensedMedicines = new ArrayList<>();
            for (DispenseRequestDTO.DispensedMedicineDTO medicineDTO : requestDTO.getDispensedMedicines()) {
                // Validate medicine
                Optional<Medicines> medicineOptional = medicinesRepository
                        .findById(Integer.parseInt(medicineDTO.getPrescribedMedicineId().toString()));
                if (!medicineOptional.isPresent()) {
                    throw new RuntimeException("Medicine not found");
                }
                Medicines medicine = medicineOptional.get();

                // Check stock quantity
                if (medicine.getStockQuantity() == null || medicine.getStockQuantity() < medicineDTO.getDispensedQuantity()) {
                    throw new RuntimeException("Insufficient stock for medicine ID: " + medicine.getMedicineID());
                }

                // Update stock quantity
                medicine.setStockQuantity(medicine.getStockQuantity() - medicineDTO.getDispensedQuantity());
                medicinesRepository.save(medicine);

                // Update medicine request quantity
                Optional<MedicineRequest> medicineRequestOptional = medicineRequestRepository
                        .findByMedicineMedicineID(Long.parseLong(medicine.getMedicineID().toString()));
                if (medicineRequestOptional.isPresent()) {
                    MedicineRequest medicineRequest = medicineRequestOptional.get();
                    if (medicineRequest.getQuantity() > 0) {
                        medicineRequest.setQuantity(medicineRequest.getQuantity() - medicineDTO.getDispensedQuantity());
                        medicineRequestRepository.save(medicineRequest);
                    }
                }

                // Create dispensed medicine entry
                DispensedMedicine dispensedMedicine = new DispensedMedicine();
                dispensedMedicine.setMedicine(medicine);
                dispensedMedicine.setDispensedQuantity(medicineDTO.getDispensedQuantity());
                dispensedMedicines.add(dispensedMedicine);
            }

            // Create and save dispense request
            DispenseRequest dispenseRequest = new DispenseRequest();
            dispenseRequest.setAppointment(appointment);
            dispenseRequest.setRequestedBy(appointment.getUser());
            dispenseRequest.setDispensedMedicines(dispensedMedicines);
            dispenseRequest.setDispenseDate(new Date());
            dispenseRequest.setStatus("DISPENSED");
            dispenseRequestRepository.save(dispenseRequest);

            // Update appointment status
            appointment.setStatus("DISPENSED");
            appointmentRepository.save(appointment);

            return "Dispense request created successfully";
        } catch (Exception e) {
            System.out.println(e);
            throw new RuntimeException("Error creating dispense request: " + e.getMessage());
        }
    }
    public Optional<DispenseRequest> getDispenseRequestById(Long id) {
        return dispenseRequestRepository.findById(id);
    }
}
