package com.example.uniMed.services.role_based.doctors;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.uniMed.controllers.role_based.doctors.AppointmentsDTO;
import com.example.uniMed.models.Appointments;
import com.example.uniMed.models.DTOs.AppointmentsDTO1;
import com.example.uniMed.models.DTOs.PrescriptionDTO;
import com.example.uniMed.models.Doctors;
import com.example.uniMed.models.Medicines;
import com.example.uniMed.models.User;
import com.example.uniMed.models.medicine.PrescribedMedicine;
import com.example.uniMed.models.medicine.Prescription;
import com.example.uniMed.repositories.auth.UserRepo;
import com.example.uniMed.repositories.doctor.AppointmentsRepository;
import com.example.uniMed.repositories.doctor.MedicineRepository;
import com.example.uniMed.repositories.doctor.PrescribedMedicineRepository;
import com.example.uniMed.repositories.doctor.PrescriptionRepository;
import com.example.uniMed.repositories.publics.duty_roster.DoctorRepository;
import com.example.uniMed.services.role_based.doctors.patterns.AppointmentFactory;
import com.example.uniMed.services.role_based.doctors.patterns.MedicinesBuilder;
import com.example.uniMed.services.role_based.doctors.patterns.PrescribedMedicineBuilder;
import com.example.uniMed.services.role_based.doctors.patterns.PrescriptionBuilder;

import jakarta.annotation.Nullable;
import jakarta.transaction.Transactional;

@Service
public class AppointmentsService {

    @Autowired
    private AppointmentsRepository appointmentsRepository;

    @Autowired
    private PrescribedMedicineRepository prescribedMedicineRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PrescribedMedicineRepository prescribedMedicineRepo;

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private MedicineRepository medicineRepository;

    public Appointments createAppointment(AppointmentsDTO appointment, Integer userId) {
      
        Optional<User> optionalUser = userRepo.findById(Long.parseLong(userId.toString()));

       
        if (!optionalUser.isPresent()) {
            throw new RuntimeException("User not found");
        }
        Appointments appointment2 = AppointmentFactory.createAppointment(appointment, optionalUser.get());
         
        return appointmentsRepository.save(appointment2);
    }

@Transactional
public Appointments prescribeMedicine(Integer appointmentId, List<PrescribedMedicineDTO> prescribedMedicinesDTO,
        @Nullable String description, @Nullable String date, @Nullable String status, Integer doctorID,
        Integer userID, String diagnosis) {

    // Create Prescription using the Builder
    Prescription prescription = new PrescriptionBuilder()
        .withDescription(description)
        .withDiagnosis(diagnosis)
        .withDate(date)
        .build();

    Optional<User> optionalUser = userRepo.findById(Long.parseLong(userID.toString()));
    Optional<Doctors> optionalDoctor = doctorRepository.findById(Long.parseLong(doctorID.toString()));
    Optional<Appointments> optionalAppointment = appointmentsRepository.findById(appointmentId);

    if (!optionalAppointment.isPresent()) {
        throw new RuntimeException("Appointment not found");
    }

    if (!optionalUser.isPresent()) {
        throw new RuntimeException("User not found");
    }

    if (!optionalDoctor.isPresent()) {
        throw new RuntimeException("Doctor not found");
    }

    prescription.setDoctor(optionalDoctor.get());
    prescription.setPatient(optionalUser.get());

    // Save the prescription first to ensure it is managed by the persistence context
    prescription = prescriptionRepository.save(prescription);

    List<PrescribedMedicine> prescribedMedicines = new ArrayList<>();
    for (PrescribedMedicineDTO prescribedMedicineDTO : prescribedMedicinesDTO) {
        Medicines medicine;

        if (prescribedMedicineDTO.getMedicineID() == null) {
            // Use MedicinesBuilder to construct the medicine object
            Optional<User> optionalUser1 = userRepo.findById(Long.parseLong(doctorID.toString()));
            User addedBy = optionalUser1.orElseThrow(() -> new RuntimeException("Doctor not found"));

            medicine = new MedicinesBuilder()
                .withName(prescribedMedicineDTO.getName())
                .isOutside(true)
                .withEntryDate(Date.from(new Date().toInstant()))
                .addedBy(addedBy)
                .build();

            medicine = medicineRepository.save(medicine);
        } else {
            medicine = medicineRepository.findById(prescribedMedicineDTO.getMedicineID())
                    .orElseThrow(() -> new RuntimeException("Medicine not found"));
        }

        // Use PrescribedMedicineBuilder to construct the object
        PrescribedMedicine prescribedMedicine = new PrescribedMedicineBuilder()
            .withMedicine(medicine)
            .withPrescription(prescription)
            .withQuantity(Integer.parseInt(prescribedMedicineDTO.getQuantity()))
            .withDuration(prescribedMedicineDTO.getDuration())
            .withAfterBefore(prescribedMedicineDTO.getAfterBefore())
            .build();

        prescribedMedicines.add(prescribedMedicine);
    }

    // Save each prescribed medicine to ensure it is managed by the persistence context
    for (PrescribedMedicine prescribedMedicine : prescribedMedicines) {
        prescribedMedicineRepository.save(prescribedMedicine);
    }

    prescription.setPrescribedMedicines(prescribedMedicines);
    prescriptionRepository.save(prescription);

    Appointments appointment = optionalAppointment.get();
    appointment.setPrescription(prescription);
    appointment.setStatus(status);
    appointment.setAppointmentDateTime(Date.from(new Date().toInstant()));
    return appointmentsRepository.save(appointment);
}
public Appointments updateAppointmentStatus(Integer appointmentId, String status) {
        Optional<Appointments> optionalAppointment = appointmentsRepository.findById(appointmentId);
        if (optionalAppointment.isPresent()) {
            Appointments appointment = optionalAppointment.get();
            appointment.setStatus(status);
            return appointmentsRepository.save(appointment);
        }
        return null;
    }

    // get all appointments of a user
    public List<AppointmentsDTO1> getAppointmentsByUser(Integer userID) {
        Optional<User> optionalUser = userRepo.findById(Long.parseLong(userID.toString()));
        if (optionalUser.isPresent()) {
            Optional<List<Appointments>> optionalAppointments = appointmentsRepository.findByUserUserID(userID);

            if (optionalAppointments.isPresent()) {
                List<AppointmentsDTO1> appointmentsDTOList = new ArrayList<>();
                for (Appointments appointment : optionalAppointments.get()) {
                    AppointmentsDTO1 appointmentsDTO = new AppointmentsDTO1();
                    appointmentsDTO = appointment.toDTO();

                    if (appointment.getPrescription() != null) {
                        Optional<Prescription> optionalPrescription = prescriptionRepository
                                .findById(appointment.getPrescription().getPrescriptionID());
                        if (optionalPrescription.isPresent()) {
                            PrescriptionDTO prescriptionDTO = new PrescriptionDTO();
                            prescriptionDTO = optionalPrescription.get().toDto(optionalPrescription.get());

                            if (optionalPrescription.get().getPrescribedMedicines() != null) {
                                List<PrescribedMedicineDTO> prescribedMedicineDTOList = new ArrayList<>();
                                for (PrescribedMedicine prescribedMedicine : optionalPrescription.get()
                                        .getPrescribedMedicines()) {
                                    PrescribedMedicineDTO prescribedMedicineDTO = prescribedMedicine.toDTO();
                                    prescribedMedicineDTOList.add(prescribedMedicineDTO);
                                }
                                prescriptionDTO.setPrescribedMedicinesDTOs(prescribedMedicineDTOList);
                            } else {
                                System.out.println("No medicines found");
                            }
                            appointmentsDTO.setPrescription(prescriptionDTO);
                        }
                    }
                    appointmentsDTOList.add(appointmentsDTO);
                }
                return appointmentsDTOList;
            }
        }
        return null;
    }

    public Page<AppointmentsDTO1> getAllAppointments(Pageable pageable) {
        Page<Appointments> appointmentsPage = appointmentsRepository.findAll(pageable);
        List<Appointments> appointments = appointmentsPage.getContent();
        List<AppointmentsDTO1> appointmentsDTOs = new ArrayList<>();

        for (Appointments appointment : appointments) {
            AppointmentsDTO1 appointmentsDTO1 = appointment.toDTO();
            appointmentsDTOs.add(appointmentsDTO1);
        }
        return new PageImpl<>(appointmentsDTOs, pageable, appointmentsPage.getTotalElements());
    }
}
