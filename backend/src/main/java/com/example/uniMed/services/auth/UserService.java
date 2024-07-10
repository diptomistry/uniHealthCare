package com.example.uniMed.services.auth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.uniMed.models.Doctors;
import com.example.uniMed.models.Role;
import com.example.uniMed.models.Student;
import com.example.uniMed.models.User;
import com.example.uniMed.repositories.EmailSender;
import com.example.uniMed.repositories.auth.DoctorRepository;
import com.example.uniMed.repositories.auth.RoleRepository;
import com.example.uniMed.repositories.auth.StudentRepository;
import com.example.uniMed.repositories.auth.UserRepo;

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
            if (file != null) {
                filePath = saveFile(file);
            } else {
                filePath = "default/avatar.jpeg";
            }

            String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
            String token = BCrypt.hashpw(email, BCrypt.gensalt());
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
                Student student = new Student(newUser.getId(), departmentId, session, registrationNo);
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
    public String updateUser(MultipartFile file, Long user_id, String email, String email2, String name, String department, String session, String registrationNo, String phone, MultipartFile phone2) throws Exception {
        Optional<User> userOpt = userRepository.findById((user_id));
        if (!userOpt.isPresent()) {
            return "User does not exist";
        }

        User user = userOpt.get();

        if (user_id != null) {
            user.setUserID(user_id);
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
            studentRepository.updateDepartment(user_id, department);
        }
        if (session != null) {
            studentRepository.updateSession(user_id, session);
        }
        if (registrationNo != null) {
            studentRepository.updateRegistrationNo(user_id, registrationNo);
        }

        return "User updated successfully";
    }

    @Transactional
    public String deleteUser(Long userId) {
        try {
            userRepository.deleteUserData(userId);
            userRepository.deleteById(userId);
            return "User and all related records deleted successfully";
        } catch (Exception e) {
            return "An error occurred while deleting the user";
        }
    }

    public String updateUserStatus(Long userId, String status) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (!userOpt.isPresent()) {
            return "User does not exist";
        }

        User user = userOpt.get();
        user.setStatus(status);
        userRepository.save(user);
        return "User status updated successfully";
    }

    public String updateUserRole(Long userId, Integer roleId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (!userOpt.isPresent()) {
            return "User does not exist";
        }

        User user = userOpt.get();
        user.setRoleId(roleId);
        userRepository.save(user);
        return "User role updated successfully";
    }

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public String sendOtp(String email, boolean debug) throws Exception {
        int otp = generateOtp(debug);
        String message = "Use this token to reset your password: " + otp;
        emailSender.sendEmail(email, "Password Reset Request", message);
        return "OTP sent successfully";
    }

    public String verifyEmail(String email) throws Exception {
        int otp = generateOtp(false);
        String message = "Use this token to reset your password: " + otp;
        emailSender.sendEmail(email, "Password Reset Request", message);
        return "OTP sent successfully";
    }

    public String resetPassword(String email, String currentPass, String confirmPass) throws Exception {
        if (!currentPass.equals(confirmPass)) {
            return "Password does not match";
        }

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (!userOpt.isPresent()) {
            return "User does not exist";
        }

        User user = userOpt.get();
        String hashedPassword = BCrypt.hashpw(currentPass, BCrypt.gensalt());
        user.setPassword(hashedPassword);
        userRepository.save(user);

        return "Password reset successfully";
    }

    public String loginUser(String email, String password) throws Exception {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (!userOpt.isPresent()) {
            return "User does not exist";
        }

        User user = userOpt.get();
        if (!BCrypt.checkpw(password, user.getPassword())) {
            return "Invalid username or password";
        }

        return "Login successful";
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

        int otp = 1000 + random.nextInt(9000);
        return otp;
    }

 
    private String saveFile(MultipartFile file) throws Exception {
        // Implement file saving logic here
        return "path/to/saved/file";
    }



    public String getDoctors() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getDoctors'");
    }
}
