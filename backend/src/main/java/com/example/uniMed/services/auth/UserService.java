package com.example.uniMed.services.auth;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.example.uniMed.models.DTOs.DoctorsDTO;
import com.example.uniMed.models.DTOs.UserDTO;
import com.example.uniMed.models.Doctors;
import com.example.uniMed.models.Role;
import com.example.uniMed.models.Student;
import com.example.uniMed.models.User;
import com.example.uniMed.models.rating.Rating;
import com.example.uniMed.repositories.EmailSender;
import com.example.uniMed.repositories.auth.StudentRepository;
import com.example.uniMed.repositories.auth.UserRepo;
import com.example.uniMed.repositories.doctor.RatingRepository;
import com.example.uniMed.repositories.publics.about_us.DepartmentRepository;
import com.example.uniMed.repositories.publics.duty_roster.DoctorRepository;
import com.example.uniMed.services.auth.common_services.UserServices;
import com.example.uniMed.services.auth.factories.UserCreator;
import com.example.uniMed.services.auth.factories.UserCreatorFactory;
import com.example.uniMed.services.file.FileService;
import com.example.uniMed.utils.JwtHelper;

import jakarta.persistence.EntityNotFoundException;

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
    private FileService fileService;

    @Autowired
    private RatingRepository ratingRepository;


    public ResponseEntity<Map<String, Object>> getUser(Long userId) {
        
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return createResponse(true, "User found", user.get().toDTO());
        } else {
            return createResponse(false, "User not found", null);
        }
        
    }
   
   
   

    @Transactional
    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createUser(
            @RequestParam MultipartFile file,
            @RequestParam String password,
            @RequestParam String confirmPass,
            @RequestParam String email,
            @RequestParam Date dob,
            @RequestParam String name,
            @RequestParam String gender,
            @RequestParam String userType,
            @RequestParam(required = false) Map<String, String> additionalFields) {

       
        try {
            // Validate password match
            if (!password.equals(confirmPass)) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Passwords do not match"
                ));
            }
            UserServices userService = new UserServices();

            // Check email existence
            if (userService.isEmailExists(email)) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Email already exists"
                ));
            }

            // Save file
            String filePath = userService.saveFile(file);

            // Create user
            String hashedPassword = userService.hashPassword(password);
            String token = userService.generateToken(email);

            Optional<Role> role = userService.findRoleByName(userType);
            if (role.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Invalid role"
                ));
            }

            User user = new User.Builder()
    .password(hashedPassword)
    .email(email)
    .dob(dob)
    .name(name)
    .sex(gender)
    .role(role.get())
    .image(filePath)
    .token(token)
    .status("Pending")
    .registeredFrom(additionalFields.get("registeredFrom"))
    .phone(additionalFields.get("phone"))
    .address(additionalFields.get("address"))
    .build();

            Object specificUser;
            if (!"admin".equalsIgnoreCase(userType)) {
                UserCreatorFactory userCreatorFactory = new UserCreatorFactory();
                // Use factory to handle specific user creation logic
                UserCreator creator = userCreatorFactory.getUserCreator(userType);
                specificUser = creator.createUser(user, additionalFields);
            } else {
                // Handle admin creation (if applicable)
                specificUser = userRepository.save(user);
            }

            return createResponse(true, "User created successfully", specificUser);

        } catch (Exception e) {
            return createResponse(false, "An error occurred while creating the user: " + e.getMessage(), null);
        }
    }
    

    @Transactional
    public ResponseEntity<Map<String, Object>> updateUser(Long userId, String email, String dobString,
            String name, String department, String session, String registrationNo,
            String phone, String departmentId, String password) {
        
        try {
            if (password == null || password.isEmpty()) {
               return createResponse(false, "Password is required", null);
            }

            Optional<User> userOpt = userRepository.findById(userId);
            if (userOpt.isEmpty()) {
                throw new EntityNotFoundException("User not found with id: " + userId);
            }

            User user = userOpt.get();
            if (!BCrypt.checkpw(password, user.getPassword())) {
                return createResponse(false, "Invalid password", null);
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

            return createResponse(true, "User updated successfully", user.toDTO());
        } catch (Exception e) {
            return createResponse(false, "An error occurred while updating the user: " + e.getMessage(), null);
        }
    }

    @Transactional
    public ResponseEntity<Map<String, Object>> deleteUser(Long userId) {
       
        try {
            User user = userRepository.findById(userId).get();
            if (user == null) {
                return createResponse(false, "User id invalid", null);
            }

            if (user.getRole().getRoleName().equals("student")) {
                Student student = studentRepository.findByUserId(userId);
                studentRepository.delete(student);
            } else if (user.getRole().getRoleName().equals("doctor")) {
                Doctors doctor = doctorRepository.findByUserID(userId);
                doctorRepository.delete(doctor);
            }

            userRepository.delete(user);
            return createResponse(true, "User deleted successfully", null);
        } catch (Exception e) {
            return createResponse(false, "Failed to delete user: " + e.getMessage(), null);
        }
       
    }

    public ResponseEntity<Map<String, Object>> updateUserStatus(Long userId, String status) {
       
        Optional<User> userOpt = userRepository.findById(userId);
        if (!userOpt.isPresent()) {
            return createResponse(false, "User does not exist", null);
        }

        User user = userOpt.get();
     
        user.setStatus(status);
        userRepository.save(user);
        return createResponse(true, "User status updated successfully",userRepository.findById(userId).get().toDTO());
       
    }

    public ResponseEntity<Map<String, Object>> updateUserRole(Long userId, Integer roleId) {
       
        Optional<User> userOpt = userRepository.findById(userId);
        if (!userOpt.isPresent()) {
           return createResponse(false, "User does not exist", null);
        }

        User user = userOpt.get();
        user.setRoleId(roleId);
        userRepository.save(user);

        return createResponse(true, "User role updated successfully",userRepository.findById(userId).get().toDTO());
    }

    public ResponseEntity<Map<String, Object>> getUserById(Long userId) {
       
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return createResponse(true, "User found", user.get().toDTO());
        } else {
            return createResponse(false, "User not found", null);
        }
       
    }

    public Map<String, Object> getAllUsers() {
        
        List<User> users = userRepository.findAll();
        List<UserDTO> userDTOs = users.stream().map(User::toDTO).collect(Collectors.toList());
      return createResponse(true, "Users retrieved successfully", userDTOs).getBody();
       
    }

    public ResponseEntity<Map<String, Object>> sendOtp(String email, boolean debug)  {
        try {
            
            int otp = generateOtp(debug);
            String message = "Use this token to reset your password: " + otp;
            emailSender.sendEmail(email, "Password Reset Request", message);
        
            return createResponse(true, "OTP sent successfully", Map.of("otp", otp));
          
        } catch (Exception e) {
            return createResponse(false, "Failed to send OTP: " + e.getMessage(), null);
        }
    }

    public ResponseEntity<Map<String, Object>> verifyEmail(String email)  {
        
        int otp = generateOtp(false);
        String message = "Use this token to reset your password: " + otp;
        emailSender.sendEmail(email, "Password Reset Request", message);
        return createResponse(true, "OTP sent successfully", Map.of("otp", otp));
    }

    public ResponseEntity<Map<String, Object>> resetPassword(String userID, String currentPass, String confirmPass)  {
        

        Optional<User> userOpt = userRepository.findById(Long.parseLong(userID));
        if (!userOpt.isPresent()) {
            return createResponse(false, "User does not exist", null);
        }

        User user = userOpt.get();

        // Check current password
        String userCurrentPass = user.getPassword();
        if (!BCrypt.checkpw(currentPass, userCurrentPass)) {
            return createResponse(false, "Invalid current password", null);
        }

        // Hash new password and update user
        String hashedPassword = BCrypt.hashpw(confirmPass, BCrypt.gensalt());
        user.setPassword(hashedPassword);
        userRepository.save(user);

        return createResponse(true, "Password reset successfully", user.toDTO());
    }

    public Map<String, Object> loginUser(String email, String password)  {
        
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (!userOpt.isPresent()) {
           return createResponse(false, "Invalid username or password", null).getBody();
        }

        User user = userOpt.get();
        if (!BCrypt.checkpw(password, user.getPassword())) {
            return createResponse(false, "Invalid username or password", null).getBody();
        }
        // generate token
        String token = new JwtHelper().generateToken(email);
        user.setToken(token);
        

        // Build the response
        return createResponse(true, "Login successful", user.toDTO()).getBody();
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

    public ResponseEntity<Map<String, Object>> getDoctors() {
        
        try {

            List<Doctors> doctors = doctorRepository.findAll();
            List<DoctorsDTO> doctorsDTOs = convertDoctorsToDTOs(doctors);

            return createResponse(true, "Doctors retrieved successfully", doctorsDTOs);
        } catch (Exception e) {
            return createResponse(false, "Failed to get doctors: " + e.getMessage(), null);
        

      
    }
}

    public ResponseEntity<Map<String, Object>> changeImage(Long userId, MultipartFile image) {
        
        try {

            User user = userRepository.findById(userId).get();
            if (user == null) {
                return createResponse(false, "User id invalid", null);
            }
            try {
                fileService.deleteFile(user.getImage());
            } catch (Exception e) {
                System.out.println("Error: " + e.getMessage());

            }
            String imageUrl = fileService.saveFile(image);

            user.setImage(imageUrl);

            userRepository.save(user);
            return createResponse(true, "Image updated successfully", Map.of("imageUrl", imageUrl, "data", user.toDTO()));
        } catch (Exception e) {
            return createResponse(false, "Failed to update image: " + e.getMessage(), null);
        }
       
    }
    private ResponseEntity<Map<String, Object>> createResponse(boolean success, String message, Object data) {
        HashMap<String, Object> response = new HashMap<>();
        response.put("success", success);
        response.put("message", message);
        if (data != null) response.put("data", data);
        return new ResponseEntity<>(response, success ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }
    public static void validatePasswordMatch(String password, String confirmPassword) {
        if (!password.equals(confirmPassword)) throw new IllegalArgumentException("Passwords do not match");
    }

}