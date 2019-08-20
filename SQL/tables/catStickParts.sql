CREATE TABLE cat_stick_parts (
  stick_parts_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  stick_parts_item INT NOT NULL,
  FOREIGN KEY (stick_parts_item) REFERENCES items (item_id)
);

INSERT INTO cat_stick_parts (stick_parts_item) VALUES (1), (3), (4);