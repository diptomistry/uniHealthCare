package com.example.uniMed.services.role_based.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.uniMed.models.Role;
import com.example.uniMed.repositories.auth.UserRepo;
import com.example.uniMed.repositories.auth.role.RoleRepository;
import com.example.uniMed.repositories.doctor.AppointmentsRepository;
import com.example.uniMed.repositories.doctor.MedicineRepository;
import com.example.uniMed.repositories.publics.duty_roster.DoctorRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StatService {

    @Autowired
    private UserRepo userRepo;

    @Autowired 
    private AppointmentsRepository appointmentsRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private RoleRepository roleRepository;
    public Map<Integer, Long> getYearlyPatientCount() {
        List<Object[]> results = appointmentsRepository.findYearlyPatientCount();
        Map<Integer, Long> yearlyPatientCount = new HashMap<>();

        for (Object[] result : results) {
            Integer year = (Integer) result[0];
            Long count = (Long) result[1];
            yearlyPatientCount.put(year, count);
        }

        return yearlyPatientCount;
    }
    public Map<String, Object> getStatistics() {
        Map<String, Object> stats = new HashMap<>();

      
        long totalUsers = userRepo.count();
        long activeUsers = userRepo.countByStatus("APPROVED");
        long inactiveUsers = userRepo.countByStatus("PENDING");
        long totalDoctors = doctorRepository.count();
       

        List<Role> roles = roleRepository.findAll();
        Map<String, Long> roleStats = new HashMap<>();
        for (Role role : roles) {
            roleStats.put(role.getRoleName(), userRepo.countByRole(role));
        }
        long pendingAppointments = appointmentsRepository.countByStatus("SCHEDULED");
        long prescribedAppointments = appointmentsRepository.countByStatus("PRESCRIBED");
        long dispensedAppointments = appointmentsRepository.countByStatus("DISPENSED");

        HashMap<String, Long> hashAppointments = new HashMap<>();
        hashAppointments.put("pendingAppointments", pendingAppointments);
        hashAppointments.put("prescribedAppointments", prescribedAppointments);
        hashAppointments.put("dispensedAppointments", dispensedAppointments);



        HashMap <String, Long> hashMedicines = new HashMap<>();

        
        long outOfStock = medicineRepository.countOutOfStock();
        long available = medicineRepository.countAvailable();
        long total = medicineRepository.countTotal();
        long expired = medicineRepository.countExpired();
        long lowStock = medicineRepository.countLowStock();

        hashMedicines.put("outOfStock", outOfStock);
        hashMedicines.put("available", available);
        hashMedicines.put("total", total);
        hashMedicines.put("expired", expired);
        hashMedicines.put("lowStock", lowStock);
      
       stats.put("appointments", hashAppointments);
        // Total medicines


        // Total appointments
        long totalAppointments = appointmentsRepository.count();


        HashMap<String, Long> hashUsers = new HashMap<>();
        hashUsers.put("totalUsers", totalUsers);
        hashUsers.put("activeUsers", activeUsers);
        hashUsers.put("inactiveUsers", inactiveUsers);
        hashUsers.put("totalDoctors", totalDoctors);
       


        stats.put("users", hashUsers);
        // stats.put("totalDoctors", totalDoctors);
        stats.put("totalUsersByRoles", roleStats);
        stats.put("medicines", hashMedicines);
      

        return stats;
    }
 
    public Map<Integer, Long> getMonthlyPatientCountByYear(int year) {
        Map<Integer, Long> monthlyPatientCount = new HashMap<>();
        // Initialize all months with 0
        for (int month = 1; month <= 12; month++) {
            monthlyPatientCount.put(month, 0L);
        }

        List<Object[]> results = appointmentsRepository.findMonthlyPatientCountByYear(year);
        for (Object[] result : results) {
            Integer month = (Integer) result[0];
            Long count = (Long) result[1];
            monthlyPatientCount.put(month, count);
        }

        return monthlyPatientCount;
    }
    public Map<Integer, Map<String, Long>> getYearlyPatientCountByGender() {
        Map<Integer, Map<String, Long>> yearlyPatientCountByGender = new HashMap<>();
        List<Object[]> results = appointmentsRepository.findYearlyPatientCountByGender();

        for (Object[] result : results) {
            Integer year = (Integer) result[0];
            String gender = (String) result[1];
            Long count = (Long) result[2];

            yearlyPatientCountByGender
                .computeIfAbsent(year, k -> {
                    Map<String, Long> genderMap = new HashMap<>();
                    if (!gender.equals("Male") && count==0){
                    genderMap.put("Male", 0L);
                    }
                  else    if (!gender.equals("Female") && count==0){
                    genderMap.put("Female", 0L);
                     }
                    return genderMap;
                })
                .put(gender, count);
        }

        return yearlyPatientCountByGender;
    }
    public Map<Integer, Map<String, Long>> getYearlyPatientCountByRole() {
        Map<Integer, Map<String, Long>> yearlyPatientCountByRole = new HashMap<>();
        List<Object[]> results = appointmentsRepository.findYearlyPatientCountByRole();

        for (Object[] result : results) {
            Integer year = (Integer) result[0];
            String role = (String) result[1];
            Long count = (Long) result[2];

            yearlyPatientCountByRole
                .computeIfAbsent(year, k -> new HashMap<>())
                .put(role, count);
        }

        return yearlyPatientCountByRole;
    }
}