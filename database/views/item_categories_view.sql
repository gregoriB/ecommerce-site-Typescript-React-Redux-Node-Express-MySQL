CREATE VIEW item_categories_view AS
  SELECT
    item_id AS "id",
    item_name AS "itemName",
    item_img_url AS "imageURL",
    item_desc_short AS "descShort",
    item_desc_long AS "descLong",
    item_sku AS "sku",
    item_price AS "price",
    item_stock AS "stock",
    array_agg(cat_name) AS "category"
    FROM
      items i
    JOIN
      item_categories ic
    ON i.item_id = ic.ic_item
    JOIN
      categories c
    ON ic.ic_category = c.cat_id
    GROUP BY item_id;
