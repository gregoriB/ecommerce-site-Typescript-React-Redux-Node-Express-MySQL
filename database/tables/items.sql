DROP TABLE IF EXISTS items;

CREATE TABLE items (
    item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    item_name TEXT,
    item_img_url TEXT,
    item_desc_short TEXT,
    item_desc_long TEXT,
    item_sku VARCHAR(50),
    item_price INT,
    item_stock INT
);
