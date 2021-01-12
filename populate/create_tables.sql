DROP TABLE IF EXISTS `airlines`;
CREATE TABLE `airlines` (
    `id`      INT PRIMARY KEY,
    `name`    VARCHAR(128),
    `alias`   VARCHAR(128),
    `country` VARCHAR(128) REFERENCES countries(`name`),
    `active`  BOOLEAN
);


DROP TABLE IF EXISTS `airplanes`;
CREATE TABLE `airplanes` (
    `id`   INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(128),
    `iata` VARCHAR(8),
    `icao` VARCHAR(8)
);


DROP TABLE IF EXISTS `airports`;
CREATE TABLE `airports` (
    `id`                INT PRIMARY KEY,
    `type`              VARCHAR(32),
    `name`              VARCHAR(128),
    `position`          POINT NOT NULL,
    `altitude`          FLOAT,
    `continent`         VARCHAR(8),
    `iso_country`       VARCHAR(2) REFERENCES countries(`ISO_A2`),
    `iso_region`        VARCHAR(8),
    `city`              VARCHAR(128),
    `scheduled_service` BOOLEAN,
    `iata`              VARCHAR(3),
    `wikipedia_link`    VARCHAR(255),
    SPATIAL INDEX(`position`),
    INDEX(`iata`)
);


DROP TABLE IF EXISTS `routes`;
CREATE TABLE `routes` (
    `id`          INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `airline_id`  INT REFERENCES airlines(`id`),
    `source`      VARCHAR(3) REFERENCES airports(`iata_code`),
    `destination` VARCHAR(3) REFERENCES airports(`iata_code`),
    `airplane`    VARCHAR(3) REFERENCES airplanes(`iata_code`)
);


DROP TABLE IF EXISTS `countries`;
CREATE TABLE `countries` (
    `ISO_A2`         VARCHAR(2) NOT NULL PRIMARY KEY,
    `name`           VARCHAR(128),
    `continent`      VARCHAR(2),
    `wikipedia_link` VARCHAR(255)
);


DROP TABLE IF EXISTS `country_boundaries`;
CREATE TABLE `country_boundaries` (
    `ISO_A2`   VARCHAR(2) NOT NULL PRIMARY KEY,
    `boundary` GEOMETRY NOT NULL,
    SPATIAL INDEX(`boundary`)
);


DROP TABLE IF EXISTS `uniform`;
CREATE TABLE `uniform` (
    `position` POINT NOT NULL PRIMARY KEY,
    SPATIAL INDEX(`position`)
);


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(32)
);


DROP TABLE IF EXISTS `favourite_routes`;
CREATE TABLE `favourite_routes` (
    `id`            INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `uid`           INT REFERENCES users(`id`),
    `route_id`      INT REFERENCES routes(`id`),
    `favourited_at` TIMESTAMP
);


DROP TABLE IF EXISTS `scores`;
CREATE TABLE `scores` (
    `id`        INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `game_id`   VARCHAR(32),
    `uid`       INT REFERENCES users(`id`),
    `score`     INT,
    `timestamp` TIMESTAMP
);
