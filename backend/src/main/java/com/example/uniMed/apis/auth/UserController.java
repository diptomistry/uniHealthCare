package com.example.uniMed.apis.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.uniMed.services.auth.UserService;

import java.sql.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/create-user")
public Map<String, Object> createUser
// (@RequestPart("body") Map<String, String> body, 
// @RequestPart(value = "file", required = false) MultipartFile file)
(
                             @RequestBody Map<String, String> body)
 {

     MultipartFile file = null;
    String email = body.get("email");
    String password = body.get("password");
    String confirmPass = body.get("confirmPass");
    String name = body.get("name");
    String dob = body.get("dob");
    System.out.println(dob);
    Date dateOfBirth;
    try {
        dateOfBirth = Date.valueOf(dob);
    } catch (IllegalArgumentException e) {
        dateOfBirth=null;
        
    }

    String gender = body.get("gender");
    String userType = body.get("userType");

    Long departmentId;
    String session;
    String registrationNo;
    try {
         session = body.get("session");
         registrationNo = body.get("registrationNo");
        departmentId = Long.parseLong(body.get("departmentId"));
    } catch (NumberFormatException e) {
        departmentId = null;
        session = null;
        registrationNo = null;
    }
   
    
    String registeredFrom = body.get("registeredFrom");
    String phone = body.get("phone");
    System.out.println("Creating user");
    System.out.println(body);
   

          

    

    System.out.println("Creating user");

    return userService.createUser(file, password, confirmPass, email, dateOfBirth, name, gender, userType, departmentId, session, registrationNo, registeredFrom, phone);
}

    @PostMapping("/update-user")
    public Map<String, Object> updateUser(@RequestParam("file") MultipartFile file,
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
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to send OTP: " + e.getMessage());
            return response;
        }
    }

    @PostMapping("/delete-user")
    public Map<String, Object> deleteUser(@RequestParam Long user_id) {
        return userService.deleteUser(user_id);
    }

    @PostMapping("/update-status")
    public Map<String, Object> updateStatus(@RequestParam Long user_id, @RequestParam String status) {
        return userService.updateUserStatus(user_id, status);
    }

    @PostMapping("/update-role")
    public Map<String, Object> updateRole(@RequestParam Long user_id, @RequestParam Integer role_id) {
        return userService.updateUserRole(user_id, role_id);
    }@PostMapping("/send-otp")
    public Map<String, Object> sendOtp(@RequestParam String email, @RequestParam boolean debug) {
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
    public Map<String, Object> resetPassword(@RequestParam String email, @RequestParam String current_pass, @RequestParam String confirm_pass) {
        try {
            return userService.resetPassword(email, current_pass, confirm_pass);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to reset password: " + e.getMessage());
            return response;
        }
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        try {
            return userService.loginUser(email, password);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to login: " + e.getMessage());
            return response;
        }
    }

    @GetMapping("/get-doctors")
    public Map<String, Object> getDoctors() {
        Map<String, Object> response = userService.getDoctors();
        if (!response.containsKey("success")) {
            response.put("success", false);
            response.put("message", "Failed to get doctors");

        }
        return response;
    }
}