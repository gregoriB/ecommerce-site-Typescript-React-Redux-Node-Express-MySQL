DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_joindate TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    user_email VARCHAR(255),
    user_name VARCHAR(255),
    user_password VARBINARY(255)
);

INSERT INTO users (user_email, user_name, user_password)
VALUES (
    'brandon.gregori@gmail.com',
    'gregorib',
    'password'
),
(
    'brandon@brandon-gregori.com',
    'brandon',
    'password12'
);

SELECT * FROM users;