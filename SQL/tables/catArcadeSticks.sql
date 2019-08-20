CREATE TABLE cat_arcade_sticks (
  arcade_sticks_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  arcade_sticks_item INT NOT NULL,
  FOREIGN KEY (arcade_sticks_item) REFERENCES items (item_id)
);

INSERT INTO cat_arcade_sticks (arcade_sticks_item) VALUES (2);