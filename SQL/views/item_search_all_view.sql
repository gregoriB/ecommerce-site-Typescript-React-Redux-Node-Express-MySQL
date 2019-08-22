DROP VIEW IF EXISTS item_search_all_view;

CREATE VIEW item_search_all_view AS
  SELECT
    item_id AS 'id',
    item_name AS 'name',
    item_img_url AS 'imageURL',
    item_desc_short AS 'descShort',
    item_desc_long AS 'descLong',
    item_sku AS 'sku',
    item_price AS 'price',
    item_stock AS 'stock'
  FROM
    items;

SELECT * FROM item_search_all_view \G