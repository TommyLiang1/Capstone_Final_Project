--CREATE DATABASE CapstoneFinalProject;

-- Made some database changes including user/profile merge, would drop all and recreate all
CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(255) UNIQUE NOT NULL,
  user_email VARCHAR(255) UNIQUE NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  created_at DATE DEFAULT current_date,
  img VARCHAR(255),
  city VARCHAR(255),
  education VARCHAR(255),
  bio VARCHAR(255),
  hobbies VARCHAR(255)
);

CREATE TABLE posts(
  post_id SERIAL PRIMARY KEY,
  post_name VARCHAR(255) NOT NULL REFERENCES users(user_name),
  description_text TEXT NOT NULL,
  likes INT,
  comments INT,
  user_id INT NOT NULL REFERENCES users(user_id),
  created_at DATE DEFAULT current_date
);

CREATE TABLE comments(
  comment_id SERIAL PRIMARY KEY,
  comment_name VARCHAR(255) NOT NULL REFERENCES users(user_name),
  description_text TEXT NOT NULL,
  likes INT,
  post_id INT NOT NULL REFERENCES posts(post_id),
  created_at DATE DEFAULT current_date
);

CREATE TABLE likes(
  like_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(user_id),
  post_id INT REFERENCES posts(post_id),
  comment_id INT REFERENCES comments(comment_id)
);

-- DROP TABLE posts, comments, users, likes;