--
-- Delete database if exists
--

DROP DATABASE IF EXISTS tripmanager;

CREATE DATABASE IF NOT EXISTS tripmanager;

USE tripmanager;

--
-- Drop Tables
--

DROP TABLE IF EXISTS users;

--
-- Create Tables
--

CREATE TABLE `users`(
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR (255) UNIQUE, 
    `password` VARCHAR(255),
    `email` VARCHAR (255) UNIQUE, 
    `nationality` VARCHAR(255),
    `birthdate` DATE,
    `foto` VARCHAR(255)
);

INSERT INTO users (username, password, email, nationality, birthdate, foto) VALUES ('Vanessa', 'password', 'vanessa.cavaco.branco@gmail.com', 'Portuguese', '1990-07-01', 'idfoto');