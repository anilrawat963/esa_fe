package com.esa.controller;

import com.esa.model.User;
import com.esa.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    public UserController(UserService userService) { this.userService = userService; }

    // example: get logged-in user's profile
    @GetMapping("/me")
    public User me(Authentication auth) {
        String username = auth.getName();
        return userService.findByUsername(username).orElseThrow();
    }
}
