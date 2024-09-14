package com.example.uniMed.services.publics.duty_roster;
import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.uniMed.apis.publics.duty_roster.DutyRosterTableDTO;
import com.example.uniMed.models.Doctors;

import com.example.uniMed.models.dutyroster.DutyRoster;
import com.example.uniMed.repositories.publics.duty_roster.DoctorRepository;
import com.example.uniMed.repositories.publics.duty_roster.DutyRosterRepository;

import jakarta.persistence.*;


@Service
public class DutyRosterServices {
    @Autowired
    private DutyRosterRepository dutyRosterRepository;

    @Autowired
    private DoctorRepository doctorsRepository;

    public DutyRoster assignDoctorToDutyRoster(Long dutyRosterId, Integer doctorId) {
        DutyRoster dutyRoster = dutyRosterRepository.findById(dutyRosterId)
            .orElseThrow(() -> new EntityNotFoundException("Duty Roster not found"));
            
        Doctors doctor = doctorsRepository.findByUserID(Long.parseLong(doctorId.toString()));
        if (doctor == null) {
            throw new EntityNotFoundException("Doctor not found");
        }
        
        dutyRoster.getAssignedDoctors().add(doctor);
        return dutyRosterRepository.save(dutyRoster);
    }

    public List<DutyRoster> getDutyRosterForDay(DayOfWeek dayOfWeek) {
        return dutyRosterRepository.findByDayOfWeek(dayOfWeek);
    }

    public DutyRoster deleteDoctorFromDutyRoster(Long dutyRosterId, Integer doctorId) {
        DutyRoster dutyRoster = dutyRosterRepository.findById(dutyRosterId)
            .orElseThrow(() -> new EntityNotFoundException("Duty Roster not found"));
        
        Doctors doctor = doctorsRepository.findByUserID(Long.parseLong(doctorId.toString()));
        if (doctor == null) {
            throw new EntityNotFoundException("Doctor not found");
        }

        dutyRoster.getAssignedDoctors().remove(doctor);
        return dutyRosterRepository.save(dutyRoster);
    }

    // public DutyRoster getDutyRosterForDayAndSlot(DayOfWeek dayOfWeek, Integer slotNumber) {
    //     return dutyRosterRepository.findByDayOfWeekAndSlotNumber(dayOfWeek, slotNumber)
    //         .orElseThrow(() -> new EntityNotFoundException("Duty Roster not found"));
    // }
    public DutyRoster createDutyRoster(DutyRoster dutyRoster) {
        // You might want to add some validation here
        return dutyRosterRepository.save(dutyRoster);
    }
    public List<DutyRosterTableDTO> getDutyRosterTable() {
        List<DutyRosterTableDTO> table = new ArrayList<>();

        for (DayOfWeek day : DayOfWeek.values()) {
            DutyRosterTableDTO dayRoster = new DutyRosterTableDTO();
            dayRoster.setDayOfWeek(day);

            List<DutyRoster> rosters = dutyRosterRepository.findByDayOfWeek(day);
            List<DutyRosterTableDTO.SlotDTO> slots = new ArrayList<>();

            for (DutyRoster roster : rosters) {
                DutyRosterTableDTO.SlotDTO slotDTO = new DutyRosterTableDTO.SlotDTO();
                
                slotDTO.setSlotTime(roster.getSlotTime());
                List<DutyRosterTableDTO.SlotDTO.DoctorDTO> doctors = roster.getAssignedDoctors().stream()
                    .map(doctor -> {
                        DutyRosterTableDTO.SlotDTO.DoctorDTO doctorDTO = new DutyRosterTableDTO.SlotDTO.DoctorDTO();
                        doctorDTO.setId(doctor.getUserID().intValue());
                        doctorDTO.setName(doctor.getName());
                        doctorDTO.setSpecialization(doctor.getDepartment().getImage());
                        return doctorDTO;
                    })
                    .collect(Collectors.toList());
                slotDTO.setDoctors(doctors);
                slotDTO.setId(roster.getId().intValue());
                slots.add(slotDTO);
            }

            dayRoster.setSlots(slots);
            table.add(dayRoster);
        }

        return table;
    }
    // Add more methods as needed
}