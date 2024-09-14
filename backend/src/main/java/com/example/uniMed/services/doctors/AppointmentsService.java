package com.example.uniMed.services.doctors;


import com.example.uniMed.models.DTOs.AppointmentsDTO1;
import com.example.uniMed.apis.doctors.AppointmentsDTO;
import com.example.uniMed.models.Appointments;
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

import jakarta.annotation.Nullable;
import jakarta.persistence.criteria.CriteriaBuilder.In;

import org.checkerframework.checker.units.qual.t;
import org.springframework.ai.vectorstore.filter.FilterExpressionBuilder.Op;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.classfile.ClassFile.Option;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.print.Doc;

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
        System.out.println("User ID: " + userId);
        Appointments appointment1 = new Appointments();
        appointment1.setAppointmentDateTime(appointment.getAppointmentDateTime());
        appointment1.setConcern(appointment.getConcern());
        appointment1.setStatus(appointment.getStatus());
        

        Optional<User> optionalUser = userRepo.findById(Long.parseLong(userId.toString()));

        if (optionalUser.isPresent()) {
            appointment1.setUser(optionalUser.get());

        }
        if (!optionalUser.isPresent()){
            System.out.println("User not found");
            throw new RuntimeException("User not found");
        }
        return appointmentsRepository.save(appointment1);
    }

    public Appointments prescribeMedicine(Integer appointmentId, List<PrescribedMedicineDTO> prescribedMedicinesDTO,
            @Nullable String description, @Nullable String date, @Nullable String status, @Nullable Integer doctorID,
            @Nullable Integer userID) {
        Prescription prescription = new Prescription();
        prescription.setDescription(description);
        prescription.setDate(date);

        Optional<User> optionalUser = userRepo.findById(Long.parseLong(userID.toString()));
        Optional<Doctors> optionalDoctor = doctorRepository.findById(Long.parseLong(doctorID.toString()));
        if (optionalUser.isPresent()) {
            prescription.setPatient(optionalUser.get());
        }
        if (optionalDoctor.isPresent()) {
            prescription.setDoctor(optionalDoctor.get());
        }
        if (!optionalUser.isPresent() || !optionalDoctor.isPresent()) {
            System.out.println("User or Doctor not found");
            throw new RuntimeException("User or Doctor not found");
        }

        // Save the prescription first to ensure it is managed by the persistence
        // context
        prescription = prescriptionRepository.save(prescription);

        List<PrescribedMedicine> prescribedMedicines = new ArrayList<>();
        for (PrescribedMedicineDTO prescribedMedicineDTO : prescribedMedicinesDTO) {
            PrescribedMedicine prescribedMedicine = new PrescribedMedicine();
            System.out.println(prescribedMedicineDTO.getMedicineID());
            if (prescribedMedicineDTO.getMedicineID() == null) {

                Medicines medicine = new Medicines();
                medicine.setName(prescribedMedicineDTO.getName());

                medicine.setIs_Outside(true);

                medicine.setEntryDate(Date.from(new Date().toInstant()));

                Optional<User> optionalUser1 = userRepo.findById(Long.parseLong(doctorID.toString()));
                if (optionalUser1.isPresent()) {
                    medicine.setAddedBy(optionalUser1.get());
                }
                medicine = medicineRepository.save(medicine);
                prescribedMedicine.setMedicine(medicine);
            } else {
                Optional<Medicines> medOptional = medicineRepository.findById(prescribedMedicineDTO.getMedicineID());
                if (medOptional.isPresent()) {

                    prescribedMedicine.setMedicine(medOptional.get());
                }

            }
            prescribedMedicine.setQuantity(prescribedMedicineDTO.getQuantity());
            prescribedMedicine.setDuration(prescribedMedicineDTO.getDuration());
            prescribedMedicine.setAfterBefore(prescribedMedicineDTO.getAfterBefore());
            // prescribedMedicine.set(prescription); // Associate with the saved
            // prescription
            prescribedMedicines.add(prescribedMedicine);
        }

        // Save each prescribed medicine to ensure it is managed by the persistence
        // context
        for (PrescribedMedicine prescribedMedicine : prescribedMedicines) {
            prescribedMedicineRepository.save(prescribedMedicine);
        }

        prescription.setPrescribedMedicines(prescribedMedicines);
        prescriptionRepository.save(prescription);

        Optional<Appointments> optionalAppointment = appointmentsRepository.findById(appointmentId);
        if (optionalAppointment.isPresent()) {
            Appointments appointment = optionalAppointment.get();
            appointment.setPrescription(prescription);
            appointment.setStatus(status);
            appointment.setAppointmentDateTime(Date.from(new Date().toInstant()));

            // appointment.setPrescribedMedicines(prescribedMedicines);
            return appointmentsRepository.save(appointment);
        }
        return null;
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
    public List<Appointments> getAppointmentsByUser(Integer userID) {
        Optional<User> optionalUser = userRepo.findById(Long.parseLong(userID.toString()));
        if (optionalUser.isPresent()) {
            Optional<List<Appointments>> optionalAppointments = appointmentsRepository.findByUserUserID(userID);
            
            if (optionalAppointments.isPresent()) {
                return optionalAppointments.get();
            }

        }
        return null;
    }
    public List<AppointmentsDTO1> getAllAppointments() {
        List<Appointments> appointments = appointmentsRepository.findAll();
        List<AppointmentsDTO1> appointmentsDTO = new ArrayList<>();
        for (Appointments appointment : appointments) {
            

            // Optional<Prescription> optionalPrescription = prescriptionRepository.findById(appointment
            //         .getPrescription()
            //         .getPrescriptionID());
            // if (optionalPrescription.isPresent()) {
            //     appointment.setPrescription(optionalPrescription.get());
            // }
            Integer appoinmentId=appointment.getAppointmentID();
            System.out.println("-----................................>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            System.out.println(appoinmentId);
            Optional<User> optionalUsers = appointmentsRepository.findUserByAppointmentID(appoinmentId);


          
            if (optionalUsers.isPresent()) {
                AppointmentsDTO1 appointmentsDTO1 = new AppointmentsDTO1();
                appointmentsDTO1.setAppointmentDateTime(appointment.getAppointmentDateTime());
                appointmentsDTO1.setAppointmentID(appointment.getAppointmentID());
                appointmentsDTO1.setConcern(appointment.getConcern());  
                appointmentsDTO1.setStatus(appointment.getStatus());
                appointmentsDTO1.setUser(optionalUsers.get());
                appointmentsDTO.add(appointmentsDTO1);

                
                System.out.println("-----................................>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                System.out.println(optionalUsers.get());
                appointment.setUser(optionalUsers.get());
            }
           
         

        }
        return appointmentsDTO;
    }

}
