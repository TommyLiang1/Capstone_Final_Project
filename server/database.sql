--CREATE DATABASE CapstoneFinalProject;

-- Create Users Table
CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  created_at DATE DEFAULT current_date,
  img VARCHAR(255),
  city VARCHAR(255),
  education VARCHAR(255),
  bio VARCHAR(255),
  hobbies VARCHAR(255)
);

--FOR MERGING PROFILES AND USERS:
-- DROP TABLE users, profiles, likes;
-- then create new users and likes table

--insert fake users
--INSERT INTO users (user_name, user_email, user_password) VALUES ('tommy', 'tommy@gmail.com', 'tommy');

-- DROP TABLE users, profiles;

CREATE TABLE posts(
  post_id SERIAL PRIMARY KEY,
  post_name VARCHAR(255) NOT NULL,
  description_text TEXT NOT NULL,
  likes INT,
  comments INT,
  user_id INT NOT NULL REFERENCES users(user_id),
  created_at DATE DEFAULT current_date
);

CREATE TABLE comments(
  comment_id SERIAL PRIMARY KEY,
  comment_name VARCHAR(255) NOT NULL,
  description_text TEXT NOT NULL,
  likes INT,
  post_id INT NOT NULL REFERENCES users(user_id),
  created_at DATE DEFAULT current_date
);

CREATE TABLE likes(
  like_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(user_id),
  post_id INT REFERENCES posts(post_id),
  comment_id INT REFERENCES comments(comment_id)
);

-- DROP TABLE posts, comments;