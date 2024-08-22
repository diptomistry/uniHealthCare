package com.example.uniMed.services.auth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.uniMed.models.Doctors;
import com.example.uniMed.models.Role;
import com.example.uniMed.models.Student;
import com.example.uniMed.security.JwtHelper;
import com.example.uniMed.models.User;
import com.example.uniMed.repositories.EmailSender;
import com.example.uniMed.repositories.auth.DoctorRepository;
import com.example.uniMed.repositories.auth.RoleRepository;
import com.example.uniMed.repositories.auth.StudentRepository;
import com.example.uniMed.repositories.auth.UserRepo;
import com.example.uniMed.services.FileService;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.*;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private EmailSender emailSender;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private FileService fileService;

 @Transactional
    public Map<String, Object> createUser(MultipartFile file,
                                          String password,
                                          String confirmPass,
                                          String email,
                                          Date dob,
                                          String name,
                                          String gender,
                                          String userType,
                                          Long departmentId,
                                          String session,
                                          String registrationNo,
                                          String registeredFrom,
                                          String phone) {
        Map<String, Object> response = new HashMap<>();

        try {
            if (!password.equals(confirmPass)) {
                response.put("success", false);
                response.put("message", "Password does not match");
                return response;
            }
            

            Optional<User> existingUser = userRepository.findByEmail(email);
            if (existingUser.isPresent()) {
                response.put("success", false);
                response.put("message", "Email already exists");
                return response;
            }

            String filePath;
       
                 filePath =  fileService.saveFile(file);
            

            String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
            String token = new JwtHelper().generateToken(email);
            String status = "Pending";
            if ("student".equals(userType) || "teacher".equals(userType) || "staff".equals(userType)) {
                status = "Approved";
            }
            System.out.println("------->Here");
            Optional<Role> role = roleRepository.findByRoleName(userType);
            System.out.println("------>Here");
            if(role.isPresent()){
                System.out.println("Role found");
            }
            else{
                System.out.println("Role not found");
            }
            
           
            
            User newUser = new User(hashedPassword, email, dob, name, gender, role.get(), filePath, token, status, registeredFrom, phone);
            userRepository.save(newUser);

            if ("student".equals(userType)) {
                if (departmentId == null || session == null || registrationNo == null) {
                    userRepository.delete(newUser);
                    response.put("success", false);
                    response.put("message", "Department, session, and registration number must be provided for students");
                    return response;
                }
                System.out.println("------->Creating student");
                System.out.println("---->id: "+newUser.getId());
                Student student = new Student(newUser, departmentId, session, registrationNo);
                studentRepository.save(student);
            } else if ("doctor".equals(userType)) {

                if (departmentId == null) {
                    userRepository.delete(newUser);
                    response.put("success", false);
                    response.put("message", "Specialization must be provided for doctors");
                    return response;
                }
                System.out.println("------->Creating doctor");

                Doctors doctor = new Doctors(newUser, departmentId);
                doctorRepository.save(doctor);
            }

            response.put("success", true);
            response.put("message", "User created successfully");
            return response;
        } catch (Exception e) {
            // e.printStackTrace();
            System.out.println(e.getMessage());
            response.put("success", false);
            response.put("message", "An error occurred while creating the user: " + e.getMessage());
            return response;
        }
    }
    @Transactional
    public Map<String, Object> updateUser(MultipartFile file, Long userId, String email, String email2, String name, String department, String session, String registrationNo, String phone, MultipartFile phone2) throws Exception {
        Map<String, Object> response = new HashMap<>();
        Optional<User> userOpt = userRepository.findById(userId);
        if (!userOpt.isPresent()) {
            response.put("success", false);
            response.put("message", "User does not exist");
            return response;
        }

        User user = userOpt.get();

        if (userId != null) {
            user.setUserID(userId);
        }
        if (email != null) {
            user.setEmail(email);
        }
        if (email2 != null) {
            user.setDob(email2);
        }
        if (name != null) {
            user.setName(name);
        }
        if (phone != null) {
            user.setPhone(phone);
        }
        if (phone2 != null) {
            String filePath = saveFile(phone2);
            user.setImage(filePath);
        }

        userRepository.save(user);

        if (department != null) {
            studentRepository.updateDepartment(userId, department);
        }
        if (session != null) {
            studentRepository.updateSession(userId, session);
        }
        if (registrationNo != null) {
            studentRepository.updateRegistrationNo(userId, registrationNo);
        }

        response.put("success", true);
        response.put("message", "User updated successfully");
        return response;
    }

    @Transactional
    public Map<String, Object> deleteUser(Long userId) {
        Map<String, Object> response = new HashMap<>();
        try {
            userRepository.deleteUserData(userId);
            userRepository.deleteById(userId);
            response.put("success", true);
            response.put("message", "User and all related records deleted successfully");
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "An error occurred while deleting the user");
        }
        return response;
    }

    public Map<String, Object> updateUserStatus(Long userId, String status) {
        Map<String, Object> response = new HashMap<>();
        Optional<User> userOpt = userRepository.findById(userId);
        if (!userOpt.isPresent()) {
            response.put("success", false);
            response.put("message", "User does not exist");
            return response;
        }

        User user = userOpt.get();
        user.setStatus(status);
        userRepository.save(user);

        response.put("success", true);
        response.put("message", "User status updated successfully");
        return response;
    }

    public Map<String, Object> updateUserRole(Long userId, Integer roleId) {
        Map<String, Object> response = new HashMap<>();
        Optional<User> userOpt = userRepository.findById(userId);
        if (!userOpt.isPresent()) {
            response.put("success", false);
            response.put("message", "User does not exist");
            return response;
        }

        User user = userOpt.get();
        user.setRoleId(roleId);
        userRepository.save(user);

        response.put("success", true);
        response.put("message", "User role updated successfully");
        return response;
    }

    public Map<String, Object> getUserById(Long userId) {
        Map<String, Object> response = new HashMap<>();
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            response.put("success", true);
            response.put("message", "User found");
            response.put("data", user.get());
        } else {
            response.put("success", false);
            response.put("message", "User not found");
        }
        return response;
    }

    public Map<String, Object> getAllUsers() {
        Map<String, Object> response = new HashMap<>();
        List<User> users = userRepository.findAll();
        response.put("success", true);
        response.put("message", "Users retrieved successfully");
        response.put("data", users);
        return response;
    }

    public Map<String, Object> sendOtp(String email, boolean debug) throws Exception {
        try{
        Map<String, Object> response = new HashMap<>();
        int otp = generateOtp(debug);
        String message = "Use this token to reset your password: " + otp;
        emailSender.sendEmail(email, "Password Reset Request", message);
        response.put("success", true);
        response.put("message", "OTP sent successfully");
        response.put("otp", otp);
        return response;
        }
        catch(Exception e){
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to send OTP: " + e.getMessage());
            return response;
        }
    }

    public Map<String, Object> verifyEmail(String email) throws Exception {
        Map<String, Object> response = new HashMap<>();
        int otp = generateOtp(false);
        String message = "Use this token to reset your password: " + otp;
        emailSender.sendEmail(email, "Password Reset Request", message);
        response.put("success", true);
        response.put("message", "OTP sent successfully");
        return response;
    }

    public Map<String, Object> resetPassword(String email, String currentPass, String confirmPass) throws Exception {
        Map<String, Object> response = new HashMap<>();
        if (!currentPass.equals(confirmPass)) {
            response.put("success", false);
            response.put("message", "Password does not match");
            return response;
        }

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (!userOpt.isPresent()) {
            response.put("success", false);
            response.put("message", "User does not exist");
            return response;
        }

        User user = userOpt.get();
        String hashedPassword = BCrypt.hashpw(currentPass, BCrypt.gensalt());
        user.setPassword(hashedPassword);
        userRepository.save(user);

        response.put("success", true);
        response.put("message", "Password reset successfully");
        return response;
    }

    public Map<String, Object> loginUser(String email, String password) throws Exception {
        Map<String, Object> response = new HashMap<>();
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (!userOpt.isPresent()) {
            response.put("success", false);
            response.put("message", "User does not exist");
            return response;
        }
    
        User user = userOpt.get();
        if (!BCrypt.checkpw(password, user.getPassword())) {
            response.put("success", false);
            response.put("message", "Invalid username or password");
            return response;
        }
        //generate token
        String token = new JwtHelper().generateToken(email);
        user.setToken(token);
        System.out.println("Token: "+token);

    
        // Build the response
        response.put("success", true);
        response.put("message", "Login successful");
        response.put("data", user);
    
    
    
        return response;
    }
    
    private int generateOtp(boolean debug) {
        if (debug) {
            return 1234;
        }

        SecureRandom random;
        try {
            random = SecureRandom.getInstanceStrong();
        } catch (NoSuchAlgorithmException e) {
            random = new SecureRandom();
        }

        return 1000 + random.nextInt(9000);
    }

    private String saveFile(MultipartFile file) throws Exception {
        return (file != null) ? fileService.saveFile(file) : "default/avatar.jpeg";
    }

    public Map<String, Object> getDoctors() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("message", "Method not implemented for getDoctors");
        return response;
    }
}
