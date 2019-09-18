CREATE TABLE featured_items (
    fi_id SERIAL PRIMARY KEY,
    fi_item INT NOT NULL,
    FOREIGN KEY (fi_item) REFERENCES items (item_id)
);
