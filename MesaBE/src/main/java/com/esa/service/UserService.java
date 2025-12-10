package com.esa.service;
import com.esa.dto.RegisterRequest;
import com.esa.model.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
    User register(RegisterRequest req, String creatorRole);
    User updateUser(Long id, RegisterRequest req, String requesterRole);
    void deleteUser(Long id, String requesterRole);
    List<User> getAllUsers();
    Optional<User> findByUsername(String username);
}
