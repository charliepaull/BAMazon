DROP DATABASE IF EXISTS bamazon_db;

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

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (111, "SONY M3 Headphones", "technology", 349.99, 50),
(112, "Gross of Chiquita bananas", "food", 100, 600),
(113, "Cowbucker Dad Hat - 'Nice Ax'", "clothing", 9.49, 40),
(114, "Crime & Punishment", "new books", 8.25, 300),
(115, "Mamba Menality - Kobe Bryant", "new books", 27, 4),
(116, "SARPA Rockclimbing Shoes", "sports", 100, 45),
(117, "Costco Year-Long Membership", "memberships", 250, 10),
(118, "Rawlings Official MLB Baseball - 12 pack", "sports", 218.95, 15),
(119, "Whole Foods Market Gift Card", "memberships", 75, 10),
(120, "Betta Fish Tank & Water Garden", "accessories", 69.95, 150),
(121, "Vector Robot by Anki - Voice Controlled", null, 185.39, 3),
(122, "Boosted Mini x Electric Skateboard", "toys", 1085.99, 15);