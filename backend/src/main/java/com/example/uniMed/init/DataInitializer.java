package com.example.uniMed.init;


import com.example.uniMed.models.Role;
import com.example.uniMed.models.dutyroster.DayOfWeek;
import com.example.uniMed.repositories.auth.role.RoleRepository;
import com.example.uniMed.repositories.publics.duty_roster.DayOfWeekRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private DayOfWeekRepository dayOfWeekRepository;

    @Override
    public void run(String... args) throws Exception {
        List<Role> roles= Arrays.asList(
                new Role("admin"),
                new Role("student"),
                new Role("doctor"),
                new Role("section_officer"),
                new Role("dispensary_officer"),
                new Role("senior_officer"),
                new Role("staff"),
                new Role("teacher")
        );
        List<DayOfWeek> days = Arrays.asList(
                new DayOfWeek("Monday"),
                new DayOfWeek("Tuesday"),
                new DayOfWeek("Wednesday"),
                new DayOfWeek("Thursday"),
                new DayOfWeek("Friday"),
                new DayOfWeek("Saturday"),
                new DayOfWeek("Sunday")
        );
        for (DayOfWeek day : days) {
            if (!dayOfWeekRepository.existsByName(day.getName())) {
                dayOfWeekRepository.save(day);
            }
        }
      


        for (Role role : roles) {
            if (!roleRepository.existsByRoleName(role.getRoleName())) {
                roleRepository.save(role);
            }
        }
    }
}