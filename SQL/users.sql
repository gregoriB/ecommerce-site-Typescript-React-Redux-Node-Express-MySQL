CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    joindate VARCHAR(50),
    username VARBINARY(255),
    userpass VARBINARY(255)
);

INSERT INTO users (email, joindate, username, userpass)
VALUES (
    'brandon.gregori@gmail.com',
    CURRENT_TIMESTAMP,
    'gregorib',
    'password'
),
(
    'brandon@brandon-gregori.com',
    CURRENT_TIMESTAMP,
    'brandon',
    'password12'
);