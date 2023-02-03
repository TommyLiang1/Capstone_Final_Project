CREATE DATABASE CapstoneFinalProject;

-- download extension
CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  created_at DATE DEFAULT current_date
);

--inser fake users

INSERT INTO users (user_name, user_email, user_password) VALUES ('tommy', 'tommy@gmail.com', 'tommy');