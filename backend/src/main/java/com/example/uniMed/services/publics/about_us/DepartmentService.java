package com.example.uniMed.services.publics.about_us;

import com.example.uniMed.models.Department;
import com.example.uniMed.repositories.publics.about_us.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Optional<Department> getDepartmentById(Integer id) {
        return departmentRepository.findById(id);
    }

    public Department createDepartment(Department department) {
        return departmentRepository.save(department);
    }

    public Optional<Department> updateDepartment(Integer id, Department departmentDetails) {
        return departmentRepository.findById(id).map(department -> {
            department.setName(departmentDetails.getName());
            department.setDescription(departmentDetails.getDescription());
            department.setImage(departmentDetails.getImage());
            return departmentRepository.save(department);
        });
    }

    public boolean deleteDepartment(Integer id) {
        return departmentRepository.findById(id).map(department -> {
            departmentRepository.delete(department);
            return true;
        }).orElse(false);
    }
}