DROP VIEW IF EXISTS featured_items_view;

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

SELECT * FROM featured_items_view \G