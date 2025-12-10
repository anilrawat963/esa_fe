package com.esa.model;

import jakarta.persistence.*;

@Entity
@Table(name = "proj_users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uid;

    @Column(nullable = false, unique = true)
    private String username; // email

    @Column(nullable = false)
    private String password;

    @Column(name = "user_group", nullable = false)
    private String userGroup; // A,B,C...

    @Column(nullable = false)
    private String designation; // SUPER_ADMIN, ADMIN, USER

    // Now i am doing
    @Column(nullable = false)
    private boolean approved = false;  // NEW

    
    public boolean isApproved() {
		return approved;
	}

	public void setApproved(boolean approved) {
		this.approved = approved;
	}

	public User() {}

    // getters & setters
    public Long getUid() { return uid; }
    public void setUid(Long uid) { this.uid = uid; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getUserGroup() { return userGroup; }
    public void setUserGroup(String userGroup) { this.userGroup = userGroup; }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }
}
