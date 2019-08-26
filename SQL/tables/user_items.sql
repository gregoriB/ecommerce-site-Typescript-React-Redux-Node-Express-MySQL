DROP TABLE IF EXISTS user_items;

CREATE TABLE user_items (
  ui_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  ui_user INT NOT NULL,
  ui_item INT NOT NULL,
  ui_qty INT NOT NULL,
  FOREIGN KEY (ui_user) REFERENCES users (user_id),
  FOREIGN KEY (ui_item) REFERENCES items (item_id)
);


INSERT INTO user_items (ui_user, ui_item, ui_qty) VALUES (1, 3, 2), (1, 2, 4), (2, 5, 8), (2, 1, 3), (2, 2, 10);

SELECT * FROM user_items;