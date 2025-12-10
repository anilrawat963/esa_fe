package com.esa.dto;

public class RegisterRequest {
    private String username;
    private String password;
    private String userGroup;
    private String designation; // ADMIN, USER (SUPER_ADMIN creation not allowed from public)

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getUserGroup() { return userGroup; }
    public void setUserGroup(String userGroup) { this.userGroup = userGroup; }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }
}
