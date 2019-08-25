DROP VIEW IF EXISTS ic;

CREATE VIEW ic AS
  SELECT
    JSON_ARRAYAGG(item_id) AS 'Item IDs',
    JSON_ARRAYAGG(cat_name) AS 'Categories'
    FROM
      items i
    JOIN
      item_categories ic
    ON i.item_id = ic.ic_item
    JOIN
      categories c
    ON ic.ic_category = c.cat_id;

SELECT * FROM ic \G
