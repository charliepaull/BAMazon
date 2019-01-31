CREATE DATABASE bamazon_db;

USE bamazon_db;

DROP TABLE IF EXITS prodcts;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    item_id INT NULL,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(30) NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY(id)
);