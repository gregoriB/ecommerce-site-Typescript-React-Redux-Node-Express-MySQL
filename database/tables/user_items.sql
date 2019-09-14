CREATE TABLE user_items (
  ui_id SERIAL PRIMARY KEY,
  ui_user INT NOT NULL,
  ui_item INT NOT NULL,
  ui_qty INT NOT NULL,
  FOREIGN KEY (ui_user) REFERENCES users (user_id),
  FOREIGN KEY (ui_item) REFERENCES items (item_id)
);

