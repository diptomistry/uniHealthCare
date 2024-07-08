package com.example.uniMed.apis.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.uniMed.services.auth.UserService;

import java.sql.Date;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/create-user")
    public String createUser(@RequestParam("file") MultipartFile file,
                             @RequestParam String confirmPass,
                             @RequestParam String email,
                             @RequestParam Date dob,
                             @RequestParam String name,
                             @RequestParam String gender,
                             @RequestParam String userType,
                             @RequestParam(required = false) Long department_id,
                             @RequestParam(required = false) String session,
                             @RequestParam(required = false) String registrationNo,
                             @RequestParam(required = false) String registeredFrom,
                             @RequestParam(required = false) String phone) {
        try {
            return userService.createUser(file, confirmPass, email, dob, name, gender, userType, department_id, session, registrationNo, registeredFrom, phone);
        } catch (Exception e) {
            return "Failed to create user: " + e.getMessage();
        }
    }

    @PostMapping("/update-user")
    public String updateUser(@RequestParam("file") MultipartFile file,
                             @RequestParam Long user_id,
                             @RequestParam(required = false) String email,
                             @RequestParam(required = false) String dob,
                             @RequestParam(required = false) String name,
                             @RequestParam(required = false) String department,
                             @RequestParam(required = false) String session,
                             @RequestParam(required = false) String registrationNo,
                             @RequestParam(required = false) String phone) {
        try {
            return userService.updateUser(file, user_id, email, dob, name, department, session, registrationNo, phone, file);
        } catch (Exception e) {
            return "Failed to update user: " + e.getMessage();
        }
    }

    @PostMapping("/delete-user")
    public String deleteUser(@RequestParam Long user_id) {
        return userService.deleteUser(user_id);
    }

    @PostMapping("/update-status")
    public String updateStatus(@RequestParam Long user_id, @RequestParam String status) {
        return userService.updateUserStatus(user_id, status);
    }

    @PostMapping("/update-role")
    public String updateRole(@RequestParam Long user_id, @RequestParam Integer role_id) {
        return userService.updateUserRole(user_id, role_id);
    }

    @PostMapping("/send-otp")
    public String sendOtp(@RequestParam String email, @RequestParam boolean debug) {
        try {
            return userService.sendOtp(email, debug);
        } catch (Exception e) {
            return "Failed to send OTP: " + e.getMessage();
        }
    }

    @PostMapping("/verify-email")
    public String verifyEmail(@RequestParam String email) {
        try {
            return userService.verifyEmail(email);
        } catch (Exception e) {
            return "Failed to verify email: " + e.getMessage();
        }
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestParam String email, @RequestParam String current_pass, @RequestParam String confirm_pass) {
        try {
            return userService.resetPassword(email, current_pass, confirm_pass);
        } catch (Exception e) {
            return "Failed to reset password: " + e.getMessage();
        }
    }

    @PostMapping("/login")
    public String login(@RequestParam String email, @RequestParam String password) {
        try {
            return userService.loginUser(email, password);
        } catch (Exception e) {
            return "Login failed: " + e.getMessage();
        }
    }

    @GetMapping("/get-doctors")
    public String getDoctors() {
        return userService.getDoctors();
    }
}
