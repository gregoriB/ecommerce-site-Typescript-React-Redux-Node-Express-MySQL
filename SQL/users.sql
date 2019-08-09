CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    joindate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    username VARBINARY(255),
    userpass VARBINARY(255)
);

INSERT INTO users (email, username, userpass)
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