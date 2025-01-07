package com.example.uniMed.services.auth.factories;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.uniMed.models.Student;
import com.example.uniMed.models.User;
import com.example.uniMed.repositories.auth.StudentRepository;

@Service
public class StudentCreator implements UserCreator {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public Object createUser(User user, Map<String, String> additionalFields) {
        String departmentId = additionalFields.get("departmentId");
        String session = additionalFields.get("session");
        String registrationNo = additionalFields.get("registrationNo");

        if (departmentId == null || session == null || registrationNo == null) {
            throw new IllegalArgumentException("Department, session, and registration number are required for students");
        }

        Student student = new Student();
        student.setUser(user);
        student.setDepartment(departmentId);
        student.setSession(session);
        student.setRegistrationNo(registrationNo);

        return studentRepository.save(student);
    }
}