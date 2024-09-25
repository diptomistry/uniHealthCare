package com.example.uniMed.init;


import com.example.uniMed.models.AboutUs;
import com.example.uniMed.models.Role;

import com.example.uniMed.repositories.auth.role.RoleRepository;
import com.example.uniMed.repositories.publics.about_us.AboutUsRepository;

import org.checkerframework.checker.units.qual.A;
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
    private AboutUsRepository aboutUsRepository;

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
      
      


        for (Role role : roles) {
            if (!roleRepository.existsByRoleName(role.getRoleName())) {
                roleRepository.save(role);
            }
        }

        
        List<AboutUs> aboutUsList = aboutUsRepository.findAll();
        if (aboutUsList.isEmpty()) {
            AboutUs aboutUs = new AboutUs();
            aboutUs.setDescription("This is a project for the course CSE327. The project is about a university medical center. The project is developed by a group of students. The project is developed using Spring Boot, React, and MySQL.");
            aboutUs.setAppName("UniMed");
            aboutUsRepository.save(aboutUs);
        }
       
       
    }
}