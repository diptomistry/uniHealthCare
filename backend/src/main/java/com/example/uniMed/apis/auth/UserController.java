package com.example.uniMed.apis.auth;





import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.uniMed.models.User;
import com.example.uniMed.services.auth.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/create-user")
    public User createUser(@RequestBody User user) {
        System.err.println("Creating user");
        return userService.saveUser(user);
    }
    @GetMapping("/")
    public String Hello(@RequestParam String param) {
        return "Hello " + param;
    }
    

    // Other endpoints...
}

