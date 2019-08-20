CREATE TABLE cat_adapters (
  adapters_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  adapters_item INT NOT NULL,
  FOREIGN KEY (adapters_item) REFERENCES items (item_id)
);

INSERT INTO cat_adapters (adapters_item) VALUES (5);