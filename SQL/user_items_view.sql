DROP VIEW IF EXISTS ui;
CREATE VIEW ui AS
  SELECT
    user_id,
    username,
    CAST(CONCAT('[', GROUP_CONCAT(json_quote(name) ORDER BY name SEPARATOR ','), ']') as json) AS shopping_cart
  FROM
    users
    INNER JOIN user_items
      ON users.user_id = user_items.ui_user
    INNER JOIN items
      ON user_items.ui_item = items.item_id
  GROUP BY
    user_id;

SELECT * FROM ui;