package com.example.uniMed.services.auth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.uniMed.models.Doctors;
import com.example.uniMed.models.Student;
import com.example.uniMed.models.User;
import com.example.uniMed.repositories.EmailSender;
import com.example.uniMed.repositories.auth.DoctorRepository;
import com.example.uniMed.repositories.auth.StudentRepository;
import com.example.uniMed.repositories.auth.UserRepo;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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

    @Transactional
    public String createUser(MultipartFile file,
                             String confirmPass,
                             String email,
                             Date dob,
                             String name,
                             String gender,
                             String userType,
                             Long department_id,
                             String session,
                             String registrationNo,
                             String registeredFrom,
                             String phone) throws Exception {
        String filePath = (file != null) ? saveFile(file) : "default/avatar.jpeg";
    
       
    
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            return "Email already exists";
        }
    
        String hashedPassword = BCrypt.hashpw(confirmPass, BCrypt.gensalt());
        String token = BCrypt.hashpw(email, BCrypt.gensalt());
    
        String status = (userType.equals("student") || userType.equals("teacher") || userType.equals("staff")) ? "Approved" : "Pending";
    
        User newUser = new User(hashedPassword, email, dob, name, gender, getUserRoleId(userType), filePath, token, status, registeredFrom, phone);
        userRepository.save(newUser);
    
        if (userType.equals("student")) {
            if (department_id == null || session == null || registrationNo == null) {
                userRepository.delete(newUser);
                return "Department, session, and registration number must be provided for students";
            }
            Student student = new Student(newUser.getId(), department_id, session, registrationNo);
            studentRepository.save(student);
        } else if (userType.equals("doctor")) {
            // Handle doctor specific logic
        }
    
        return "User created successfully";
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

    private Integer getUserRoleId(String userType) {
        switch (userType) {
            case "admin":
                return 1;
            case "doctor":
                return 2;
            case "student":
                return 3;
            case "teacher":
                return 4;
            case "staff":
                return 5;
            case "dispensary_officer":
                return 6;
            case "senior_officer":
                return 7;
            case "section_officer":
                return 8;
            default:
                throw new IllegalArgumentException("Invalid user type");
        }
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
