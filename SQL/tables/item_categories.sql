DROP TABLE IF EXISTS item_categories;

CREATE TABLE item_categories (
    ic_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ic_item INT NOT NULL,
    ic_category INT NOT NULL,
    FOREIGN KEY (ic_item) REFERENCES items (item_id),
    FOREIGN KEY (ic_category) REFERENCES categories (cat_id)
);

INSERT INTO item_categories (ic_item, ic_category) VALUES 
    (1, 2), 
    (1, 3), 
    (2, 1), 
    (3, 2), 
    (4, 2), 
    (5, 3), 
    (6, 4);

SELECT * FROM item_categories;