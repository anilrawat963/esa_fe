package com.esa.dto;

public class AuthResponse {
    private String token;
    private String username;
    private String designation;
    private String userGroup;

    public AuthResponse(String token, String username, String designation, String userGroup) {
        this.token = token;
        this.username = username;
        this.designation = designation;
        this.userGroup = userGroup;
    }

    // getters
    public String getToken() { return token; }
    public String getUsername() { return username; }
    public String getDesignation() { return designation; }
    public String getUserGroup() { return userGroup; }
}
