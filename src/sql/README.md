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