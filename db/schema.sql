-- Drops the cakeList if it exists currently --
DROP DATABASE IF EXISTS cakeList;
-- Creates the "cakeList" database --
CREATE DATABASE cakeList;
USE cakeList;

DROP TABLE IF EXISTS cakes;
CREATE TABLE cakes(
    id int NOT NULL AUTO_INCREMENT,
    cake_name varchar(255) NOT NULL,
    devoured BOOL DEFAULT false,
    PRIMARY KEY (id)
);
