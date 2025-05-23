# Реалізація інформаційного та програмного забезпечення

У рамках проєкту розробляється:
- SQL-скрипти для створення та початкового наповнення бази даних;
- RESTful сервіс для управління даними.


## SQL-скрипти
### main.sql
```sql
  CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    isActive BOOLEAN NOT NULL
);

CREATE TABLE Survey (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL,
    creationDate DATETIME NOT NULL,
    closeDate DATETIME,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
);

CREATE TABLE Question (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    isRequired BOOLEAN NOT NULL,
    `order` INT NOT NULL,
    surveyId INT NOT NULL,
    FOREIGN KEY (surveyId) REFERENCES Survey(id) ON DELETE CASCADE
);

CREATE TABLE SurveyLink (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(100) NOT NULL UNIQUE,
    isActive BOOLEAN NOT NULL,
    expiryDate DATETIME,
    clicks INT NOT NULL DEFAULT 0,
    surveyId INT NOT NULL,
    FOREIGN KEY (surveyId) REFERENCES Survey(id) ON DELETE CASCADE
);

CREATE TABLE Response (
    id INT AUTO_INCREMENT PRIMARY KEY,
    submissionDate DATETIME NOT NULL,
    isComplete BOOLEAN NOT NULL,
    surveyLinkId INT NOT NULL,
    FOREIGN KEY (surveyLinkId) REFERENCES SurveyLink(id) ON DELETE CASCADE
);

CREATE TABLE Answer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    value TEXT NOT NULL,
    responseId INT NOT NULL,
    questionId INT NOT NULL,
    FOREIGN KEY (responseId) REFERENCES Response(id) ON DELETE CASCADE,
    FOREIGN KEY (questionId) REFERENCES Question(id) ON DELETE CASCADE
);
```

### test_d.sql
```sql
  INSERT INTO User (email, passwordHash, role, isActive) VALUES
('admin@example.com', 'hash1', 'admin', TRUE),
('user1@example.com', 'hash2', 'respondent', TRUE),
('user2@example.com', 'hash3', 'respondent', TRUE);

INSERT INTO Survey (title, description, status, creationDate, closeDate, userId) VALUES
('Customer Satisfaction Survey', 'Tell us about your experience.', 'active', NOW(), NULL, 1),
('Product Feedback', 'We value your thoughts on our new product.', 'draft', NOW(), NULL, 1),
('Website Usability', 'How easy is it to use our website?', 'active', NOW(), NULL, 1);

INSERT INTO Question (text, type, isRequired, `order`, surveyId) VALUES
-- Survey 1
('How satisfied are you?', 'rating', TRUE, 1, 1),
('What can we improve?', 'text', FALSE, 2, 1),
-- Survey 2
('Is the product useful?', 'yesno', TRUE, 1, 2),
('Would you recommend it?', 'yesno', TRUE, 2, 2),
-- Survey 3
('Was the site easy to navigate?', 'yesno', TRUE, 1, 3),
('Any technical issues?', 'text', FALSE, 2, 3);

INSERT INTO SurveyLink (token, isActive, expiryDate, clicks, surveyId) VALUES
('link1', TRUE, DATE_ADD(NOW(), INTERVAL 10 DAY), 5, 1),
('link2', TRUE, DATE_ADD(NOW(), INTERVAL 5 DAY), 0, 1),
('link3', TRUE, DATE_ADD(NOW(), INTERVAL 15 DAY), 2, 2),
('link4', TRUE, DATE_ADD(NOW(), INTERVAL 7 DAY), 1, 3);

INSERT INTO Response (submissionDate, isComplete, surveyLinkId) VALUES
(NOW(), TRUE, 1),
(NOW(), TRUE, 2),
(NOW(), FALSE, 3),
(NOW(), TRUE, 4);

-- Response 1 (link1, survey 1)
INSERT INTO Answer (value, responseId, questionId) VALUES
('4', 1, 1),
('More options needed.', 1, 2);

-- Response 2 (link2, survey 1)
INSERT INTO Answer (value, responseId, questionId) VALUES
('5', 2, 1),
('Nothing to improve.', 2, 2);

-- Response 3 (link3, survey 2) — incomplete, only one answer
INSERT INTO Answer (value, responseId, questionId) VALUES
('Yes', 3, 3);

-- Response 4 (link4, survey 3)
INSERT INTO Answer (value, responseId, questionId) VALUES
('Yes', 4, 5),
('No issues', 4, 6);
```

## RESTful сервіс для управління даними

RESTful сервіс для управління таблицею User у базі даних db, створеної в MySQL. Цей застосунок був створений за допомогою фреймворку Spring Boot на мові Java. Цей застосунок реалізує набір CRUD-операцій (Create, Read, Update, Delete) для роботи з користувачами, що зберігаються в базі даних.

### Структура проєкту
```
src/
 └─ main/
     ├─ java/
     │    └─ com.example.app
     │        ├─ Main.java
     │        ├─ controller/
     │        │    └─ UserController.java
     │        ├─ model/
     │        │    └─ User.java
     │        ├─ repository/
     │        │    └─ UserRepository.java
     └─ resources/
          └─application.properties

```

### Підключення до бази даних (application.properties):
``` properties
spring.datasource.url=jdbc:mysql://localhost:3307/db
spring.datasource.url=jdbc:mysql://localhost:3307/db
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.hibernate.naming.physical-strategy=org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
```

### Модель User:
``` java
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

```
### Контролер UserController:
``` java
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
            return ResponseEntity.badRequest().body("Помилка: не надано дані користувача.");
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
```
### Інтерфейс UserRepository
Відповідає за доступ до бази даних і реалізує шар репозиторію для сутності User. Розширює JpaRepository, що дозволяє використовувати готові CRUD-операції без необхідності їхньої ручної реалізації.
``` java
package com.example.app.repository;

import com.example.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
```








