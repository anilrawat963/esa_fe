package com.esa.service;

import com.esa.dto.RegisterRequest;
import com.esa.model.User;
import com.esa.repository.UserRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repo;
    private final BCryptPasswordEncoder encoder;

    public UserServiceImpl(UserRepository repo, BCryptPasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    @Override
    public User register(RegisterRequest req, String creatorRole) {

        if (repo.existsByUsername(req.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        String newRole = req.getDesignation().toUpperCase();

        User u = new User();

        u.setUsername(req.getUsername());
        u.setPassword(encoder.encode(req.getPassword()));
        u.setUserGroup(req.getUserGroup());   // ✔ FIXED
        u.setDesignation(newRole);

        return repo.save(u);
    }

    @Override
    public User updateUser(Long id, RegisterRequest req, String requesterRole) {

        User existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        existing.setUserGroup(req.getUserGroup());  // ✔ FIXED

        if (req.getPassword() != null && !req.getPassword().isBlank()) {
            existing.setPassword(encoder.encode(req.getPassword()));
        }

        return repo.save(existing);
    }

    @Override
    public void deleteUser(Long id, String requesterRole) {
        User target = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        repo.delete(target);
    }

    @Override
    public List<User> getAllUsers() {
        return repo.findAll();
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return repo.findByUsername(username);
    }
}
