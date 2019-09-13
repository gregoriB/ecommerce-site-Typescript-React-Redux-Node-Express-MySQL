CREATE DATABASE store;

USE store;

CREATE TABLE categories (
    cat_id INT AUTO_INCREMENT PRIMARY KEY,
    cat_name VARCHAR(50)
);

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

CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_joindate TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    user_email VARCHAR(255),
    user_name VARCHAR(255),
    user_password VARBINARY(255)
);

CREATE TABLE featured_items (
    fi_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fi_item INT NOT NULL,
    FOREIGN KEY (fi_item) REFERENCES items (item_id)
);

CREATE TABLE item_categories (
    ic_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ic_item INT NOT NULL,
    ic_category INT NOT NULL,
    FOREIGN KEY (ic_item) REFERENCES items (item_id),
    FOREIGN KEY (ic_category) REFERENCES categories (cat_id)
);

CREATE TABLE user_items (
  ui_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  ui_user INT NOT NULL,
  ui_item INT NOT NULL,
  ui_qty INT NOT NULL,
  FOREIGN KEY (ui_user) REFERENCES users (user_id),
  FOREIGN KEY (ui_item) REFERENCES items (item_id)
);

CREATE VIEW featured_items_view AS
  SELECT
    item_id AS 'id',
    item_name AS 'itemName',
    item_img_url AS 'imageURL',
    item_desc_short AS 'descShort',
    item_desc_long AS 'descLong',
    item_sku AS 'sku',
    item_price AS 'price',
    item_stock AS 'stock'
  FROM
    items
    INNER JOIN featured_items
      ON items.item_id = featured_items.fi_item
  GROUP BY
    item_id;


CREATE VIEW item_categories_view AS
  SELECT
    item_id AS 'id',
    item_name AS 'itemName',
    item_img_url AS 'imageURL',
    item_desc_short AS 'descShort',
    item_desc_long AS 'descLong',
    item_sku AS 'sku',
    item_price AS 'price',
    item_stock AS 'stock',
    JSON_ARRAYAGG(cat_name) AS 'category'
    FROM
      items i
    JOIN
      item_categories ic
    ON i.item_id = ic.ic_item
    JOIN
      categories c
    ON ic.ic_category = c.cat_id
    GROUP BY item_id \G

    DROP VIEW IF EXISTS ui;

CREATE VIEW user_items_view AS
  SELECT
    user_id,
    user_name,
    JSON_ARRAYAGG(item_name) AS 'Shopping Cart'
  FROM
    users
    INNER JOIN user_items
      ON users.user_id = user_items.ui_user
    INNER JOIN items
      ON user_items.ui_item = items.item_id
  GROUP BY
    user_id;