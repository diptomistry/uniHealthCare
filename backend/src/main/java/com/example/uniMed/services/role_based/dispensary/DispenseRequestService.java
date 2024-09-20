package com.example.uniMed.services.role_based.dispensary;



import com.example.uniMed.models.DTOs.DispenseRequestDTO;
import com.example.uniMed.models.dispensary.DispenseRequest;
import com.example.uniMed.models.dispensary.DispensedMedicine;
import com.example.uniMed.models.dispensary.MedicineRequest;
import com.example.uniMed.models.medicine.PrescribedMedicine;
import com.example.uniMed.models.Appointments;
import com.example.uniMed.models.Medicines;
import com.example.uniMed.repositories.doctor.AppointmentsRepository;
import com.example.uniMed.repositories.doctor.MedicineRepository;
import com.example.uniMed.repositories.doctor.PrescribedMedicineRepository;
import com.example.uniMed.repositories.role_based.dispensary.DispenseRequestRepository;
import com.example.uniMed.repositories.role_based.dispensary.MedicineRequestRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.management.RuntimeErrorException;

@Service
public class DispenseRequestService {

    @Autowired
    private DispenseRequestRepository dispenseRequestRepository;

    @Autowired
    private MedicineRepository medicinesRepository;

    @Autowired
    private AppointmentsRepository appointmentRepository;

    @Autowired
    private PrescribedMedicineRepository prescribedMedicineRepository;

    @Autowired
    private MedicineRequestRepository medicineRequestRepository;


    @Transactional
    public DispenseRequest createDispenseRequest(DispenseRequestDTO requestDTO) {
        System.out.println(requestDTO.getAppointmentId());
        try{
        Optional<Appointments> appointmentOptional = appointmentRepository.findById(Integer.parseInt(requestDTO.getAppointmentId().toString()));
        if (!appointmentOptional.isPresent()) {
            throw new RuntimeException("Appointment not found");
        }
      
        Appointments appointment = appointmentOptional.get();
        System.out.println(">>>>>>>>>>>>>appoinet found");
        
        List<DispensedMedicine> dispensedMedicines = new ArrayList<>();
        for (DispenseRequestDTO.DispensedMedicineDTO medicineDTO : requestDTO.getDispensedMedicines()) {
            Optional<Medicines> medicineOptional = medicinesRepository.findById(Integer.parseInt(medicineDTO.getPrescribedMedicineId().toString()));
            if (!medicineOptional.isPresent()) {
                throw new RuntimeException("Medicine not found");
            }
            

            Medicines medicine = medicineOptional.get();
            System.out.println("medicine fou;nd");
            System.out.println(medicine.getName());
            System.out.println(medicine.getStockQuantity());
            if (medicine.getStockQuantity() < medicineDTO.getDispensedQuantity()) {
                throw new RuntimeException("Insufficient stock for medicine ID: " + medicine.getMedicineID());
            }

            medicine.setStockQuantity(medicine.getStockQuantity() - medicineDTO.getDispensedQuantity());
            medicinesRepository.save(medicine);

            Optional<MedicineRequest> medicineRequestOptional = medicineRequestRepository.findByMedicineMedicineID(Long.parseLong(medicine.getMedicineID().toString()));
            System.out.println("medicine optional");
            if (medicineRequestOptional.isPresent()) {
                MedicineRequest medicineRequest = medicineRequestOptional.get();
                if (medicineRequest.getQuantity() > 0) {
                    medicineRequest.setQuantity(medicineRequest.getQuantity() - medicineDTO.getDispensedQuantity());
                    medicineRequestRepository.save(medicineRequest);
                }
            }


            DispensedMedicine dispensedMedicine = new DispensedMedicine();
            dispensedMedicine.setMedicine(medicine);
            dispensedMedicine.setDispensedQuantity(medicineDTO.getDispensedQuantity());
            dispensedMedicines.add(dispensedMedicine);
        }

        DispenseRequest dispenseRequest = new DispenseRequest();
        dispenseRequest.setAppointment(appointment);
        dispenseRequest.setRequestedBy(appointment.getUser());
        dispenseRequest.setDispensedMedicines(dispensedMedicines);
        dispenseRequest.setDispenseDate(new Date());
        dispenseRequest.setStatus("DISPENSED");
        appointment.setStatus("DISPENSED");
        appointmentRepository.save(appointment);

        return dispenseRequestRepository.save(dispenseRequest);
    }
    catch(Exception e){
        System.out.println(e);
        throw new RuntimeException("Insufficient stock for medicine ID: ");
    }
    }

    public Optional<DispenseRequest> getDispenseRequestById(Long id) {
        return dispenseRequestRepository.findById(id);
    }
}
