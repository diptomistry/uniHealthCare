package com.example.uniMed.apis.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.uniMed.services.auth.UserService;

import java.sql.Date;
import java.util.HashMap;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



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

    String departmentName;
    String session;
    String registrationNo;
    String departmentId=null;
    try {
         session = body.get("session");
         registrationNo = body.get("registrationNo");
         departmentName = body.get("departmentName");
         departmentId = body.get("departmentId");
    } catch (NumberFormatException e) {
        departmentName = null;
        session = null;
        registrationNo = null;
    }
   
    
    String registeredFrom = body.get("registeredFrom");
    String phone = body.get("phone");
    System.out.println("Creating user");
    System.out.println(body);
   

          

    

    System.out.println("Creating user");

    return userService.createUser(file, password, confirmPass, email, dateOfBirth, name, gender, userType, departmentId, session, registrationNo, registeredFrom, phone,departmentName);
}

    @PostMapping("/update-user")
    public Map<String, Object> updateUser(@RequestParam("file") MultipartFile file,
                             @RequestBody Map<String, Object> body) {
        Long user_id = Long.parseLong(body.get("user_id").toString());
        String email = body.get("email").toString();
        String dob = body.get("dob").toString();
        String name = body.get("name").toString();
        String department = body.get("department").toString();
        String session = body.get("session").toString();
        String registrationNo = body.get("registrationNo").toString();
        String phone = body.get("phone").toString();
        
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
    public Map<String, Object> deleteUser(@RequestBody Map<String, Long> body) {
        Long user_id = body.get("user_id");
        return userService.deleteUser(user_id);
    }

    @PostMapping("/update-status")
    public Map<String, Object> updateStatus(@RequestBody Map<String, Object> body) {
        Long user_id = Long.parseLong(body.get("user_id").toString());
        System.out.println("User id: " + user_id);
        String status = (body.get("status").toString());
        return userService.updateUserStatus(user_id, status);
    }


  
    
    @PostMapping("/update-role")
    public Map<String, Object> updateRole(@RequestParam Long user_id, @RequestParam Integer role_id) {
        return userService.updateUserRole(user_id, role_id);
    }@PostMapping("/send-otp")
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
        String email = body.get("email");
        String current_pass = body.get("current_pass");
        String confirm_pass = body.get("confirm_pass");

        
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
    @GetMapping("/get-all-users")
    public Map<String,Object> getAllUsersMap(){
        return userService.getAllUsers();
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