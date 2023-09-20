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
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `nationality` VARCHAR(255) NOT NULL,
    `birthdate` DATE NOT NULL,
    `foto` VARCHAR(255) NOT NULL
);

INSERT INTO users (user, password, email, nationality, birthdate, foto) VALUES ('Vanessa', 'password', 'vanessa.cavaco.branco@gmail.com', 'Portuguese', '1990-07-01', 'idfoto');