CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_joindate TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    user_email VARCHAR(255),
    user_name VARCHAR(255),
    user_password TEXT,
    user_salt TEXT
);