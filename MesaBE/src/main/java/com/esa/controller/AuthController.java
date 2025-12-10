package com.esa.controller;

import com.esa.dto.*;
import com.esa.model.User;
import com.esa.service.UserService;
import com.esa.util.JwtUtils;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public AuthController(UserService userService, AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req, Authentication auth) {

        String creatorRole = "PUBLIC";

        if (auth != null && auth.getAuthorities() != null && auth.getAuthorities().iterator().hasNext()) {
            creatorRole = auth.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "");
        } else {
            req.setDesignation("USER");
        }

        User saved = userService.register(req, creatorRole);
        return ResponseEntity.ok("User created with ID: " + saved.getUid());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword())
            );
        } catch (Exception ex) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        User user = userService.findByUsername(req.getUsername()).orElseThrow();

        String token = jwtUtils.generateToken(
                user.getUsername(),
                user.getDesignation(),
                user.getUserGroup()   // ✔ FIXED
        );

        AuthResponse resp = new AuthResponse(
                token,
                user.getUsername(),
                user.getDesignation(),
                user.getUserGroup()   // ✔ FIXED
        );

        return ResponseEntity.ok(resp);
    }
}
