DROP VIEW IF EXISTS fi;
CREATE VIEW fi AS
  SELECT
    *
  FROM
    items
    INNER JOIN featured_items
      ON items.item_id = featured_items.fi_item
  GROUP BY
    item_id;

SELECT * FROM fi \G