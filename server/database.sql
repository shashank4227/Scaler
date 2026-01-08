-- Database Schema
CREATE DATABASE IF NOT EXISTS flipkart_clone;
USE flipkart_clone;

-- Drop tables in correct order to avoid foreign key constraints
DROP TABLE IF EXISTS product_images;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;

CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id INT,
    FOREIGN KEY (parent_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    discount_percentage INT,
    rating DECIMAL(3, 1) DEFAULT 0,
    review_count INT DEFAULT 0,
    image_url TEXT,
    category_id INT,
    is_assured BOOLEAN DEFAULT FALSE,
    stock_quantity INT DEFAULT 10,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    image_url TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(50) PRIMARY KEY,
    user_id INT DEFAULT 1,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Placed',
    shipping_address JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50),
    product_id INT,
    quantity INT,
    price_at_time DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Seed Data
INSERT INTO categories (name) VALUES 
('Mobiles'), ('Electronics'), ('Fashion'), ('Home'),
('Appliance'), ('Beauty & Personal Care'), ('Grocery');

INSERT INTO products 
(title, description, price, original_price, discount_percentage, rating, review_count, image_url, category_id, is_assured, stock_quantity)
VALUES

-- Mobiles
('Apple iPhone 15 (Black, 128 GB)', 'Experience the iPhone 15... 48MP Main camera...', 65999, 79900, 17, 4.6, 12500,
'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80', 1, TRUE, 50),

('Samsung Galaxy F14 5G (GOAT Green, 128 GB)', '6000mAh Battery. Ideal for gaming.', 11990, 18490, 35, 4.2, 8900,
'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80', 1, TRUE, 100),

('POCO C51 (Royal Blue, 64 GB)', 'Big 5000 mAh Battery, Large Display.', 5999, 9999, 40, 4.0, 5600,
'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80', 1, FALSE, 200),

('Google Pixel 7a (Snow, 128 GB)', 'Google Tensor G2 Processor.', 39999, 43999, 9, 4.4, 3200,
'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80', 1, TRUE, 30),

('Realme 11 Pro 5G (Sunrise Beige, 256 GB)', '100MP OIS ProLight Camera, Curved Vision Display.', 23999, 27999, 14, 4.3, 4100,
'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80', 1, TRUE, 45),

-- Electronics
('Noise ColorFit Icon 2', 'Bluetooth Calling, AI Voice Assistant.', 1299, 5999, 78, 4.1, 15400,
'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80', 2, TRUE, 150),

('boAt Airdopes 161', '40 Hours Playback, ASAP Charge.', 999, 2490, 59, 4.0, 21000,
'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=600&q=80', 2, FALSE, 300),

('Canon EOS 3000D DSLR', 'Camera Case 18-55mm Lens.', 33990, 35995, 5, 4.5, 900,
'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80', 2, TRUE, 10),

('HP Pavilion 15', 'Intel Core i5 12th Gen, 16GB RAM, 512GB SSD.', 62990, 78000, 19, 4.4, 850,
'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80', 2, TRUE, 25),

-- Fashion
('Men Slim Fit Solid Shirt', 'Cotton Blend, Full Sleeve.', 409, 1499, 72, 3.9, 1200,
'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80', 3, TRUE, 100),

('Women Printed Kurta', 'Rayon, Calf Length.', 499, 1999, 75, 4.1, 850,
'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80', 3, FALSE, 80),

('Men Regular Fit Jeans', 'Dark Blue, Stretchable Denim.', 699, 2499, 72, 3.8, 3400,
'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80', 3, TRUE, 120),

('Women Heels Sandal', 'Casual, Party Wear.', 449, 999, 55, 4.0, 500,
'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80', 3, FALSE, 60),

-- Home
('Double Bedsheet with 2 Pillow Covers', 'Cotton, Floral Print, Blue.', 499, 1299, 61, 4.2, 5000,
'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?auto=format&fit=crop&w=600&q=80', 4, TRUE, 80),

('Milton thermosteel Bottle', '1000ml, 24 Hr Hot/Cold.', 850, 1190, 28, 4.5, 9600,
'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80', 4, TRUE, 200),

-- Appliance
('LG 7 kg 5 Star Washing Machine', 'Front Load, Inverter Direct Drive.', 29990, 43990, 31, 4.4, 250,
'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=80', 5, TRUE, 20),

('Whirlpool 240 L Refrigerator', 'Triple Door, Frost Free.', 25790, 30150, 14, 4.2, 560,
'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=600&q=80', 5, TRUE, 15),

-- Grocery
('Aashirvaad Shudh Chakki Atta', '5 kg Pack, 100% Whole Wheat.', 240, 310, 22, 4.5, 45000,
'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=600&q=80', 7, TRUE, 500),

('Fortune Sunlite Refined Sunflower Oil', '1L Pouch.', 135, 165, 18, 4.4, 23000,
'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80', 7, TRUE, 800),

('Tata Salt', '1 kg Vacuum Evaporated Iodised Salt.', 28, 30, 6, 4.8, 89000,
'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=600&q=80', 7, TRUE, 1000),

('India Gate Basmati Rice', 'Classic, 1 kg.', 199, 255, 21, 4.3, 12000,
'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=600&q=80', 7, TRUE, 300);

-- Product Images
INSERT INTO product_images (product_id, image_url) VALUES
(1, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80'),
(5, 'https://images.unsplash.com/photo-1580910051074-7d5c90c4b7a1?auto=format&fit=crop&w=600&q=80');
