package com.esa.controller;

import com.esa.dto.RegisterRequest;
import com.esa.model.User;
import com.esa.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
public class AdminController {

    private final UserService userService;
    public AdminController(UserService userService) { this.userService = userService; }

    @GetMapping("/users")
    public List<User> getAll() { return userService.getAllUsers(); }

    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable Long id, Authentication auth) {
        String role = auth.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "");
        userService.deleteUser(id, role);
        return "User deleted";
    }

    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody RegisterRequest req, Authentication auth) {
        String role = auth.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "");
        return userService.updateUser(id, req, role);
    }
}
