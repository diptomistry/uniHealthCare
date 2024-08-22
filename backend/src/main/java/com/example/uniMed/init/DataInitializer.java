package com.example.uniMed.init;


import com.example.uniMed.models.Role;
import com.example.uniMed.repositories.auth.role.RoleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

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
    }
}