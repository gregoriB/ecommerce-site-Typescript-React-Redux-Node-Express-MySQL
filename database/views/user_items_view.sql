CREATE VIEW user_items_view AS
  SELECT
    user_id,
    user_name,
    array_agg(item_name) AS "shoppingCart"
  FROM
    users
    INNER JOIN user_items
      ON users.user_id = user_items.ui_user
    INNER JOIN items
      ON user_items.ui_item = items.item_id
  GROUP BY user_id;
