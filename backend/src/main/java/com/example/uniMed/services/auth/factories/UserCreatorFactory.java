package com.example.uniMed.services.auth.factories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserCreatorFactory {

    @Autowired
    private StudentCreator studentCreator;

    @Autowired
    private DoctorCreator doctorCreator;

    public UserCreator getUserCreator(String userType) {
        switch (userType.toLowerCase()) {
            case "student":
                return studentCreator;
            case "doctor":
                return doctorCreator;
            default:
                throw new IllegalArgumentException("Invalid user type: " + userType);
        }
    }
}