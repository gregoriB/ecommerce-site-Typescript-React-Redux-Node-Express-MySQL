CREATE TABLE item_categories (
    ic_id SERIAL PRIMARY KEY,
    ic_item INT NOT NULL,
    ic_category INT NOT NULL,
    FOREIGN KEY (ic_item) REFERENCES items (item_id),
    FOREIGN KEY (ic_category) REFERENCES categories (cat_id)
);

