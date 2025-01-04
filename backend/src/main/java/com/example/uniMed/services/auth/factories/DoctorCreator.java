package com.example.uniMed.services.auth.factories;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.uniMed.models.Department;
import com.example.uniMed.models.Doctors;
import com.example.uniMed.models.User;
import com.example.uniMed.repositories.publics.about_us.DepartmentRepository;
import com.example.uniMed.repositories.publics.duty_roster.DoctorRepository;

@Service
public class DoctorCreator implements UserCreator {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Override
    public Object createUser(User user, Map<String, String> additionalFields) {
        String departmentId = additionalFields.get("departmentId");

        if (departmentId == null) {
            throw new IllegalArgumentException("Specialization (departmentId) is required for doctors");
        }

        Optional<Department> department = departmentRepository.findById(Integer.parseInt(departmentId));
        if (department.isEmpty()) {
            throw new IllegalArgumentException("Department does not exist");
        }

        Doctors doctor = new Doctors();
        doctor.setUser(user);
        doctor.setDepartment(department.get());

        return doctorRepository.save(doctor);
    }
}
