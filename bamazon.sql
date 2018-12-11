DROP TABLE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NULL,
    price DECIMAL(5,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("SONY M3 Headphones", "technology", 349.99, 50),
("Gross of Chiquita bananas", "food", 100, 600),
("Cowbucker Dad Hat - 'Nice Ax'", "clothing", 9.49, 40),
("Crime & Punishment", "new books", 8.25, 300),
("Mamba Menality - Kobe Bryant", "new books", 27, 4),
("SARPA Rockclimbing Shoes", "sports", 100, 45),
("Costco Year-Long Membership", "memberships", 250, 10),
("Rawlings Official MLB Baseball - 12 pack", "sports", 218.95, 15),
("Whole Foods Market Gift Card", "memberships", 75, 10),
("Betta Fish Tank & Water Garden", "accessories", 69.95, 150),
("Vector Robot by Anki - Voice Controlled", null, 185.39, 3),
("Boosted Mini x Electric Skateboard", "toys", 1085.99, 15);