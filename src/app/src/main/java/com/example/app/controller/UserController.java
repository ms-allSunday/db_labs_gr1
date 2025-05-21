package com.example.app.controller;

import com.example.app.model.User;
import com.example.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Отримати всіх користувачів
    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    // Отримати одного за ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable Integer id) {
        if (userRepository.existsById(id)) {
            return ResponseEntity.ok(userRepository.findById(id).get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Користувача з ID " + id + " не знайдено");
        }
    }

    // Додати нового
    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody(required = false) User user) {
        if (user == null) {
            return ResponseEntity.badRequest().body("Дані користувача не надано.");
        }

        List<User> existingUsers = userRepository.findAll().stream()
                .filter(u -> u.getEmail().equals(user.getEmail()))
                .toList();

        if (!existingUsers.isEmpty()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Користувач з поштою " + user.getEmail() + " вже існує.");
        }

        User savedUser = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }


    // Оновити існуючого
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Integer id, @RequestBody(required = false) User updatedUser) {
        if (updatedUser == null) {
            return ResponseEntity.badRequest().body("Дані для оновлення не надані.");
        }

        var userOpt = userRepository.findById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setEmail(updatedUser.getEmail());
            user.setPasswordHash(updatedUser.getPasswordHash());
            user.setRole(updatedUser.getRole());
            user.setIsActive(updatedUser.getIsActive());
            userRepository.save(user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Користувача з ID " + id + " не знайдено");
        }
    }




    // Видалити користувача
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Користувача з ID " + id + " не знайдено");
        }
    }
}
