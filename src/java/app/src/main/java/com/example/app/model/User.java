package com.example.app.model;

import jakarta.persistence.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String email;
    private String passwordHash;
    private String role;

    private Boolean isActive;

    public Integer getId() {
        return id;
    }
    public String getEmail() {
        return email;
    }
    public String getPasswordHash() {
        return passwordHash;
    }
    public String getRole() {
        return role;
    }
    public Boolean getIsActive() {
        return isActive;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}
