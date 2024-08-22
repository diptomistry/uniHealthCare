package com.example.uniMed.services.auth.role;



import com.example.uniMed.models.Role;
import com.example.uniMed.repositories.auth.role.RoleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public Optional<Role> getRoleById(Integer id) {
        return roleRepository.findById(id);
    }

    public Role createRole(Role role) {
        return roleRepository.save(role);
    }

    public Role updateRole(Integer id, Role roleDetails) {
        Role role = roleRepository.findById(id).orElseThrow(() -> new RuntimeException("Role not found"));
        role.setRoleName(roleDetails.getRoleName());
        return roleRepository.save(role);
    }

    public void deleteRole(Integer id) {
        roleRepository.deleteById(id);
    }
}