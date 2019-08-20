CREATE TABLE cat_accessories (
  accessories_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  accessories_item INT NOT NULL,
  FOREIGN KEY (accessories_item) REFERENCES items (item_id)
);

INSERT INTO cat_accessories (accessories_item) VALUES (6);