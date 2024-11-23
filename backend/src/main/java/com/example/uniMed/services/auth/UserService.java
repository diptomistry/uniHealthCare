package com.example.uniMed.services.auth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.uniMed.models.Admin;
import com.example.uniMed.models.Department;
import com.example.uniMed.models.Doctors;
import com.example.uniMed.models.Role;
import com.example.uniMed.models.Student;
import com.example.uniMed.models.User;
import com.example.uniMed.models.DTOs.DoctorsDTO;
import com.example.uniMed.models.DTOs.UserDTO;
import com.example.uniMed.models.rating.Rating;
import com.example.uniMed.repositories.EmailSender;
import com.example.uniMed.repositories.auth.AdminRepository;
import com.example.uniMed.repositories.auth.StudentRepository;
import com.example.uniMed.repositories.auth.UserRepo;
import com.example.uniMed.repositories.auth.role.RoleRepository;
import com.example.uniMed.repositories.doctor.RatingRepository;
import com.example.uniMed.repositories.publics.about_us.DepartmentRepository;
import com.example.uniMed.repositories.publics.duty_roster.DoctorRepository;
import com.example.uniMed.services.file.FileService;
import com.example.uniMed.utils.JwtHelper;

import jakarta.persistence.EntityNotFoundException;


import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private EmailSender emailSender;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private FileService fileService;

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private AdminRepository adminRepository;

    public Map<String, Object> getUser(Long userId) {
        Map<String, Object> response = new HashMap<>();
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            response.put("success", true);
            response.put("message", "User found");
            response.put("data", user.get().toDTO());
        } else {
            response.put("success", false);
            response.put("message", "User not found");
        }
        return response;
    }

    @Transactional
    public Map<String, Object> createUser(MultipartFile file,
            String password,
            String confirmPass,
            String email,
            Date dob,
            String name,
            String gender,
            String userType,
            String departmentId,
            String session,
            String registrationNo,
            String departmentName,
            String registeredFrom,
            String phone,
            String address) {
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

            filePath = fileService.saveFile(file);

            String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
            String token = new JwtHelper().generateToken(email);
            String status = "Pending";
            if ("student".equals(userType) || "teacher".equals(userType) || "staff".equals(userType)) {
                status = "Approved";
            }
            System.out.println("------->Here");
            Optional<Role> role = roleRepository.findByRoleName(userType);
            System.out.println("------>Here");
            if (role.isPresent()) {
                System.out.println("Role found");
            } else {
                System.out.println("Role not found");
            }

            User newUser = new User(hashedPassword, email, dob, name, gender, role.get(), filePath, token, status,
                    registeredFrom, phone, address);

            System.out.println("------->Here");

            if ("student".equals(userType)) {
                if (departmentName == null || session == null || registrationNo == null) {
                    userRepository.delete(newUser);
                    response.put("success", false);
                    response.put("message",
                            "Department, session, and registration number must be provided for students");
                    return response;
                }
                System.out.println("------->Creating student");

                Student student = new Student();
                student.setDepartment(departmentId);
                student.setSession(session);
                student.setRegistrationNo(registrationNo);
                student.setUser(newUser);
                studentRepository.save(student);
                response.put("user", student);

            } else if ("doctor".equals(userType)) {

                if (departmentId == null) {
                    userRepository.delete(newUser);
                    response.put("success", false);
                    response.put("message", "Specialization must be provided for doctors");
                    return response;
                }
                System.out.println("------->Creating doctor");
                try {

                    Doctors doctor = new Doctors();
                    Optional<Department> department = departmentRepository.findById(Integer.parseInt(departmentId));
                    if (!department.isPresent()) {
                        userRepository.delete(newUser);
                        response.put("success", false);
                        response.put("message", "Department does not exist");
                        return response;
                    }
                    doctor.setDepartment(department.get());
                    doctor.setUser(newUser);

                    doctorRepository.save(doctor);
                    response.put("user", doctor.toDTO());
                } catch (Exception e) {
                    userRepository.delete(newUser);

                    System.out.println("Error: " + e.getMessage());
                    response.put("success", false);
                    response.put("message", "An error occurred while creating the doctor: " + e.getMessage());
                    return response;
                }
            } else if ("admin".equals(userType)) {
                Admin admin = new Admin(newUser, Date.from(Instant.now()), null);
                adminRepository.save(admin);
                response.put("user", admin);

            } else {
                userRepository.save(newUser);
                response.put("user", newUser.toDTO());
            }

            response.put("success", true);
            response.put("message", "User created successfully");
           
            return response;
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "An error occurred while creating the user: " + e.getMessage());
            return response;
        }
    }

    @Transactional
    public Map<String, Object> updateUser(Long userId, String email, String dobString,
            String name, String department, String session, String registrationNo,
            String phone, String departmentId, String password) {
        Map<String, Object> response = new HashMap<>();
        try {
            if (password == null || password.isEmpty()) {
                response.put("success", false);
                response.put("message", "Password must be provided");
                return response;
            }

            Optional<User> userOpt = userRepository.findById(userId);
            if (userOpt.isEmpty()) {
                throw new EntityNotFoundException("User not found with id: " + userId);
            }

            User user = userOpt.get();
            if (!BCrypt.checkpw(password, user.getPassword())) {
                response.put("success", false);
                response.put("message", "Invalid password");
                return response;
            }

            // Update user fields
            if (email != null && !email.isEmpty()) {
                user.setEmail(email);
            }
            if (name != null && !name.isEmpty()) {
                user.setName(name);
            }
            if (phone != null && !phone.isEmpty()) {
                user.setPhone(phone);
            }

            // Parse and set date of birth
            if (dobString != null && !dobString.isEmpty()) {
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
                java.util.Date utilDate = formatter.parse(dobString);
                Date dob = new Date(utilDate.getTime());
                user.setDob(dob);
            }

            userRepository.save(user);

            // Update student information if exists
            Optional<Student> studentOpt = studentRepository.findById(userId);
            if (studentOpt.isPresent()) {
                Student student = studentOpt.get();

                if (department != null) {
                    student.setDepartment(department);
                }
                if (session != null) {
                    student.setSession(session);
                }
                if (registrationNo != null) {
                    student.setRegistrationNo(registrationNo);
                }
                studentRepository.save(student);

            }

            // Update doctor information if exists
            Optional<Doctors> doctorOpt = doctorRepository.findById(userId);
            if (doctorOpt.isPresent()) {
                Doctors doctor = doctorOpt.get();
                if (departmentId != null) {
                    doctor.setDepartment(departmentRepository.findById(Integer.parseInt(departmentId)).orElseThrow(
                            () -> new EntityNotFoundException("Department not found with id: " + departmentId)));
                }
                doctorRepository.save(doctor);
            }

            response.put("success", true);
            response.put("message", "User updated successfully");
            response.put("data", user.toDTO());
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "An error occurred while updating the user: " + e.getMessage());
            return response;
        }
    }

    @Transactional
    public Map<String, Object> deleteUser(Long userId) {
        System.out.println("Deleting user");
        System.out.println("User ID: " + userId);
        Map<String, Object> response = new HashMap<>();
        try {
            User user = userRepository.findById(userId).get();
            if (user == null) {
                response.put("success", false);
                response.put("message", "User does not exist");
                return response;
            }
            System.out.println("User found");
            System.out.println("Role: " + user.getRole().getRoleName());

            if (user.getRole().getRoleName().equals("student")) {
                Student student = studentRepository.findByUserId(userId);
                studentRepository.delete(student);
            } else if (user.getRole().getRoleName().equals("doctor")) {
                Doctors doctor = doctorRepository.findByUserID(userId);
                doctorRepository.delete(doctor);
            }

            userRepository.delete(user);
            response.put("success", true);
            response.put("message", "User and all related records deleted successfully");
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "An error occurred while deleting the user + " + e.getMessage());
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
        response.put("data", userRepository.findById(userId).get().toDTO());
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
            response.put("data", user.get().toDTO());
        } else {
            response.put("success", false);
            response.put("message", "User not found");
        }
        return response;
    }

    public Map<String, Object> getAllUsers() {
        Map<String, Object> response = new HashMap<>();
        List<User> users = userRepository.findAll();
        List<UserDTO> userDTOs = users.stream().map(User::toDTO).collect(Collectors.toList());
        response.put("success", true);
        response.put("message", "Users retrieved successfully");
        response.put("data", userDTOs);
        return response;
    }

    public Map<String, Object> sendOtp(String email, boolean debug) throws Exception {
        try {
            Map<String, Object> response = new HashMap<>();
            int otp = generateOtp(debug);
            String message = "Use this token to reset your password: " + otp;
            emailSender.sendEmail(email, "Password Reset Request", message);
            response.put("success", true);
            response.put("message", "OTP sent successfully");
            response.put("otp", otp);
            return response;
        } catch (Exception e) {
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

    public Map<String, Object> resetPassword(String userID, String currentPass, String confirmPass) throws Exception {
        Map<String, Object> response = new HashMap<>();

        Optional<User> userOpt = userRepository.findById(Long.parseLong(userID));
        if (!userOpt.isPresent()) {
            response.put("success", false);
            response.put("message", "User does not exist");
            return response;
        }

        User user = userOpt.get();

        // Check current password
        String userCurrentPass = user.getPassword();
        if (!BCrypt.checkpw(currentPass, userCurrentPass)) {
            response.put("success", false);
            response.put("message", "Current password is incorrect");
            return response;
        }

        // Hash new password and update user
        String hashedPassword = BCrypt.hashpw(confirmPass, BCrypt.gensalt());
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
        // generate token
        String token = new JwtHelper().generateToken(email);
        user.setToken(token);
        

        // Build the response
        response.put("success", true);
        response.put("message", "Login successful");
        response.put("data", user.toDTO());

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

    public List<DoctorsDTO> convertDoctorsToDTOs(List<Doctors> doctors) {
        List<DoctorsDTO> doctorsDTOs = new ArrayList<>();

        // Calculate average ratings for all doctors
        for (Doctors doctor : doctors) {
            List<Rating> ratings = ratingRepository.findByDoctor(doctor);

            double averageRating = ratings.stream()
    .filter(rating -> rating.getRating() != null) // Filter out null ratings
    .mapToDouble(rating -> rating.getRating().doubleValue())
    .average()
    .orElse(0.0);
            DoctorsDTO doctorDTO = doctor.toDto(doctor);
            doctorDTO.setAverageRating(averageRating);

            doctorsDTOs.add(doctorDTO);
        }

        // Sort doctors by average rating to determine ranking
        doctorsDTOs.sort(Comparator.comparingDouble(DoctorsDTO::getAverageRating).reversed());

        // Assign ranking
        for (int i = 0; i < doctorsDTOs.size(); i++) {
            doctorsDTOs.get(i).setRanking(i + 1);
        }

        return doctorsDTOs;
    }

    public Map<String, Object> getDoctors() {
        Map<String, Object> response = new HashMap<>();
        try {

            response.put("success", true);
            response.put("message", "Doctors retrieved successfully");
            response.put("data", convertDoctorsToDTOs(doctorRepository.findAll()));
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to get doctors: " + e.getMessage());
        }

        return response;
    }

    public Map<String, Object> changeImage(Long userId, MultipartFile image) {
        Map<String, Object> response = new HashMap<>();
        try {

            User user = userRepository.findById(userId).get();
            if (user == null) {
                response.put("success", false);
                response.put("message", "User id invalid: ");
                return response;
            }
            try {
                fileService.deleteFile(user.getImage());
            } catch (Exception e) {
                System.out.println("Error: " + e.getMessage());

            }
            String imageUrl = fileService.saveFile(image);

            user.setImage(imageUrl);

            userRepository.save(user);
            response.put("success", true);
            response.put("message", "Image updated successfully");
            response.put("imageUrl", imageUrl);
            response.put("data", user.toDTO());
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to update image: " + e.getMessage());
        }
        return response;
    }
}
