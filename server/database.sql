--CREATE DATABASE CapstoneFinalProject;

-- Create Profiles Table
CREATE TABLE profiles(
  profile_id SERIAL PRIMARY KEY,
  profile_name VARCHAR(255) NOT NULL,
  profile_email VARCHAR(255) NOT NULL,
  img VARCHAR(255),
  city VARCHAR(255),
  education VARCHAR(255),
  bio VARCHAR(255),
  hobbies VARCHAR(255)
);

--insert fake profiles
--INSERT INTO profiles (profile_name, profile_email, img, city, education, bio, hobbies) VALUES ('tommy', 'tommy@gmail.com', 'img', 'city', 'edu', 'bio', 'hobbies');
--INSERT INTO profiles (profile_name, profile_email) VALUES ('tommytest', 'tommytest@gmail.com');

-- Create Users Table
CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  profile_id INT REFERENCES profiles(profile_id),
  created_at DATE DEFAULT current_date
);

--insert fake users
--INSERT INTO users (user_name, user_email, user_password) VALUES ('tommy', 'tommy@gmail.com', 'tommy');

-- DROP TABLE users, profiles;

CREATE TABLE posts(
  post_id SERIAL PRIMARY KEY,
  post_name VARCHAR(255) NOT NULL,
  description_text TEXT NOT NULL,
  likes INT,
  comments INT,
  user_id INT NOT NULL,
  created_at DATE DEFAULT current_date
);

CREATE TABLE comments(
  comment_id SERIAL PRIMARY KEY,
  comment_name VARCHAR(255) NOT NULL,
  description_text TEXT NOT NULL,
  likes INT,
  post_id INT NOT NULL,
  created_at DATE DEFAULT current_date
);

CREATE TABLE likes(
  like_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(user_id),
  post_id INT REFERENCES posts(post_id),
  comment_id INT REFERENCES comments(comment_id)
);

-- DROP TABLE posts, comments;