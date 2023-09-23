--
-- Delete database if exists
--

DROP DATABASE IF EXISTS tripmanager;

CREATE DATABASE IF NOT EXISTS tripmanager;

USE tripmanager;

--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS expences;
DROP TABLE IF EXISTS trips;
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS places;
SET foreign_key_checks = 1;

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
CREATE TABLE `expenses`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `trip_id` INT UNSIGNED NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `amount` BIGINT NOT NULL
);
CREATE TABLE `trips`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT UNSIGNED NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `coordinates` VARCHAR(255) NOT NULL,
    `date` DATE NOT NULL,
    `description` LONGTEXT NOT NULL
);
CREATE TABLE `images`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `trip_id` INT UNSIGNED NOT NULL,
    `place_id` INT UNSIGNED NOT NULL,
    `description` MEDIUMTEXT NOT NULL
);
CREATE TABLE `places`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `trip_id` INT UNSIGNED NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `coordinates` VARCHAR(255) NOT NULL,
    `day` VARCHAR(255) NOT NULL,
    `date` DATE NOT NULL,
    `description` LONGTEXT NOT NULL
);

ALTER TABLE
    `expenses` ADD CONSTRAINT `expenses_trip_id_foreign` FOREIGN KEY(`trip_id`) REFERENCES `trips`(`id`) ON DELETE CASCADE;
ALTER TABLE
    `images` ADD CONSTRAINT `images_trip_id_foreign` FOREIGN KEY(`trip_id`) REFERENCES `trips`(`id`) ON DELETE CASCADE;
ALTER TABLE
    `trips` ADD CONSTRAINT `trips_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE;
ALTER TABLE
    `images` ADD CONSTRAINT `images_place_id_foreign` FOREIGN KEY(`place_id`) REFERENCES `places`(`id`) ON DELETE CASCADE;
ALTER TABLE
    `places` ADD CONSTRAINT `places_trip_id_foreign` FOREIGN KEY(`trip_id`) REFERENCES `trips`(`id`);

--
-- Insert data into tables
--

INSERT INTO users (username, password, email, nationality, birthdate, foto) VALUES ('Vanessa', 'password', 'vanessa.cavaco.branco@gmail.com', 'Portuguese', '1990-07-01', 'idfoto');
INSERT INTO trips (user_id,name,coordinates,date,description) VALUES ('1','MyTripAçores','41.40412445575105, 2.1745114924114657','2023-07-01', 'Description trip to açores');
INSERT INTO places (trip_id,name,coordinates,day,date,description) VALUES ('1','sagrada familia','41.38733083681041, 2.168190808510549','day 1','2023-08-09','Place description');
INSERT INTO images ( name,trip_id,place_id,description) VALUES ('foto01','1','1','fotodescription');
