package com.example.uniMed.services.auth.common_services;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.multipart.MultipartFile;

import com.example.uniMed.models.Role;
import com.example.uniMed.repositories.auth.UserRepo;
import com.example.uniMed.repositories.auth.role.RoleRepository;
import com.example.uniMed.services.file.FileService;
import com.example.uniMed.utils.JwtHelper;


@Service
public class UserServices {

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private FileService fileService;

    public String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    public String generateToken(String email) {
        return new JwtHelper().generateToken(email);
    }

    public String saveFile(MultipartFile file) throws IOException {
        return fileService.saveFile(file);
    }

    public Optional<Role> findRoleByName(String roleName) {
        return roleRepository.findByRoleName(roleName);
    }

    public boolean isEmailExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }
}
