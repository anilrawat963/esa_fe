package com.esa.config;

import com.esa.service.CustomUserDetailsService;
import com.esa.util.JwtUtils;
import com.esa.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.*;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final CustomUserDetailsService userDetailsService;
    private final JwtUtils jwtUtils;

    public SecurityConfig(CustomUserDetailsService uds, JwtUtils jwt) {
        this.userDetailsService = uds;
        this.jwtUtils = jwt;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() { return new JwtAuthenticationFilter(jwtUtils, userDetailsService); }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/api/auth/**").permitAll()
                    .requestMatchers("/api/super-admin/**").hasRole("SUPER_ADMIN")
                    .requestMatchers("/api/admin/**").hasAnyRole("ADMIN","SUPER_ADMIN")
                    .requestMatchers("/api/user/**").hasAnyRole("USER","ADMIN","SUPER_ADMIN")

                    // ⭐ ADMIN + SUPER_ADMIN only
                    .requestMatchers("/api/events/create").hasAnyRole("ADMIN","SUPER_ADMIN")
                    .requestMatchers("/api/events/update/**").hasAnyRole("ADMIN","SUPER_ADMIN")
                    .requestMatchers("/api/events/delete/**").hasAnyRole("ADMIN","SUPER_ADMIN")
                    .requestMatchers("/api/events/approve/**").hasRole("SUPER_ADMIN")

                    // ⭐ USER can only READ
                    .requestMatchers("/api/events/**").hasAnyRole("USER","ADMIN","SUPER_ADMIN")

                    .anyRequest().authenticated()
            );

        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }



    @Bean
    public AuthenticationManager authenticationManager(org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration cfg) throws Exception {
        return cfg.getAuthenticationManager();
    }
}
