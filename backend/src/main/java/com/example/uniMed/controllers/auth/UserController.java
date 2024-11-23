package com.example.uniMed.controllers.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.uniMed.models.DTOs.UserDTO;
import com.example.uniMed.services.auth.UserService;

import java.sql.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/get-user")
    public Map<String, Object> getUser(@RequestBody Map<String, Long> body) {
        Long user_id = body.get("user_id");
        return userService.getUser(user_id);
    }

    @PostMapping("/create-user")
    public Map<String, Object> createUser(@RequestBody UserDTO userDTO) {
        MultipartFile file = null;
        String email = userDTO.getEmail();
        String password = userDTO.getPassword();
        String confirmPass = userDTO.getConfirmPass();
        String name = userDTO.getName();
        Date dateOfBirth = userDTO.getDob();
        String address = userDTO.getAddress();
        System.out.println("address");
        System.out.println(address);
       
       

        String gender = userDTO.getGender();
        String userType = userDTO.getUserType();

        String departmentName = userDTO.getDepartmentName();
        String session = userDTO.getSession();
        String registrationNo = userDTO.getRegistrationNo();
        String departmentId = userDTO.getDepartmentId();

        String registeredFrom = userDTO.getRegisteredFrom();
        String phone = userDTO.getPhone();
        System.out.println("Creating user");
        System.out.println(userDTO);

        return userService.createUser(file, password, confirmPass, email, dateOfBirth, name, gender, userType,
                departmentId, session, registrationNo, departmentName, registeredFrom, phone, address);
    }

    @PostMapping("/delete-user")
    public Map<String, Object> deleteUser(@RequestBody Map<String, Long> body) {
        Long user_id = body.get("user_id");
        return userService.deleteUser(user_id);
    }

    @PostMapping(value = "/update/{user_id}")
    public ResponseEntity<Map<String, Object>> updateUser(
            @PathVariable("user_id") Long userId,
            @RequestBody Map<String, String> body) {

        String email = body.get("email");
        String dob = body.get("dob");
        String name = body.get("name");
        String department = body.get("department");
        String session = body.get("session");
        String registrationNo = body.get("registrationNo");
        String phone = body.get("phone");
        String departmentId = body.get("departmentId");
        String password = body.get("password");

        return ResponseEntity.ok(userService.updateUser(userId, email, dob, name, department, session, registrationNo,
                phone, departmentId, password));

    }

    @PostMapping(value = "/change-image/{user_id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> changeImage(@PathVariable("user_id") Long userId,
            @RequestPart("file") MultipartFile image) {

        return ResponseEntity.ok(
                userService.changeImage(userId, image));

    }

    @PostMapping("/update-status")
    public Map<String, Object> updateUserStatus(@RequestBody Map<String, Object> body) {
        Long user_id = Long.parseLong(body.get("user_id").toString());
        String status = body.get("status").toString();
        return userService.updateUserStatus(user_id, status);
    }

    @PostMapping("/update-role")
    public Map<String, Object> updateRole(@RequestParam Long user_id, @RequestParam Integer role_id) {
        return userService.updateUserRole(user_id, role_id);
    }

    @PostMapping("/send-otp")
    public Map<String, Object> sendOtp(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        boolean debug = Boolean.parseBoolean(body.get("debug"));
        try {
            return userService.sendOtp(email, debug);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to send OTP: " + e.getMessage());
            return response;
        }
    }

    @PostMapping("/verify-email")
    public Map<String, Object> verifyEmail(@RequestParam String email) {
        try {
            return userService.verifyEmail(email);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to verify email: " + e.getMessage());
            return response;
        }
    }

    @PostMapping("/reset-password")
    public Map<String, Object> resetPassword(@RequestBody Map<String, String> body) {
        String userId = body.get("user_id");
        String current_pass = body.get("current_pass");
        String confirm_pass = body.get("confirm_pass");

        try {
            return userService.resetPassword(userId, current_pass, confirm_pass);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to reset password: " + e.getMessage());
            return response;
        }
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody UserDTO userDTO) {
        String email = userDTO.getEmail();
        String password = userDTO.getPassword();
        try {
            return userService.loginUser(email, password);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to login: " + e.getMessage());
            return response;
        }
    }
 
    @GetMapping("/get-all-users")
    public Map<String, Object> getAllUsersMap() {
        return userService.getAllUsers();
    }

    @GetMapping("/get-doctors")
    public Map<String, Object> getDoctors() {
        Map<String, Object> response = userService.getDoctors();
        return response;
    }
}