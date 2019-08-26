DROP TABLE IF EXISTS featured_items;

CREATE TABLE featured_items (
    fi_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fi_item INT NOT NULL,
    FOREIGN KEY (fi_item) REFERENCES items (item_id)
);

INSERT INTO featured_items (fi_item) VALUES (1), (3), (5);

SELECT * FROM featured_items;