//package com.esa.service;
//
//import com.esa.model.User;
//import com.esa.repository.UserRepository;
//
//import org.springframework.security.core.userdetails.*;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//
//import org.springframework.stereotype.Service;
//
//import java.util.*;
//
//@Service
//public class CustomUserDetailsService implements UserDetailsService {
//
//    private final UserRepository repo;
//
//    public CustomUserDetailsService(UserRepository repo) {
//        this.repo = repo;
//    }
//
//    @Override
//    public UserDetails loadUserByUsername(String username) {
//
//        User u = repo.findByUsername(username)
//                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
//
//        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
//        authorities.add(new SimpleGrantedAuthority("ROLE_" + u.getDesignation()));
//
//        return new org.springframework.security.core.userdetails.User(
//                u.getUsername(),
//                u.getPassword(),
//                authorities
//        );
//    }
//}



package com.esa.service;

import com.esa.model.User;
import com.esa.repository.UserRepository;

import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository repo;

    public CustomUserDetailsService(UserRepository repo) {
        this.repo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User u = repo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new CustomUserDetails(u);   // ⭐ FIX: return custom details
    }
}

















