CREATE TABLE items (
  item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name TEXT,
  imageURL TEXT,
  shortDescription TEXT,
  sku VARCHAR(50),
  price INT,
  stock INT
);

INSERT INTO items (name, imageURL, shortDescription, sku, price, stock)
VALUES (
            "Brook Universal Fighting Board (PS3, PS4, Xbox 360, Xbox One, PC, WiiU, Switch)",
            "https://cdn.shopify.com/s/files/1/0748/3745/products/BROOK_UFB_CLEAN.png?v=1479969193",
            "Brook LLC, makers of the Super Converters have been working hard on a all in one PCB that handles all the system, with auto system detection.   That's right, no buttons to push, no switches to adjust.  Just plug and play and it will recognize your system.",
            12345,
            94.95,
            10
        ),
       (
            "QANBA Obsidian Controller Customized with Hitbox Layout (PS3, PS4, PC)", 
            "https://cdn.shopify.com/s/files/1/0748/3745/products/01-Edit-2.jpg?v=1562928264",
            "Qanba's Obsidian has been one of the hottest arcade sticks released in the past few years.  To many, it has an attractive overall shape, clean lines and is sized appropriately for use at home or on the road.",
            23456, 
            269.99, 
            5
        ),
       (
            "Hori Hayabusa Matte Pushbutton (30mm)",
            "https://cdn.shopify.com/s/files/1/0748/3745/products/WHITE_F.png?v=1561451377",
            "While Hori has been known for designing and constructing some of the best controllers over the past few decades, they are still experimenting with the parts for them. In only their second attempt at making a pushbutton, the Hayabusa is a huge improvement to their first generation Kuro pushbutton.",
            34567, 
            3.25, 
            150),
       (
            "Hori Hayabusa Silent Optical Joystick",
            "https://cdn.shopify.com/s/files/1/0748/3745/products/hori_hyabusa_optical_angle_b3b08f46-149d-4ab2-ad4f-05375c7f5a39.png?v=1499231559",
                "Introducing Hori's Silent Stick.  Using optical sensors, these provide the quietest and smoothest operation today.   Accurate, responsive, reliable.   This is the first time we've offered this part and quantities are limited.",
            45678, 
            59.99, 
            45
        ),
       (
            "Brook Super Duo Converter PS3/4 to Sega Genesis / MD - NEC PC-Engine",
            "https://cdn.shopify.com/s/files/1/0748/3745/products/DSC08771.png?v=1557123997",
            "The long wait is over.  The Super Converter for the Sega Genesis (aka Megadrive in Japan) is almost here, allowing you to use hundreds of quality PS3 and PS4 control pads or arcade sticks to relive the retro classic gaming.",
            56789, 
            45.95, 
            60
        ),
       (
            "RYU FS Street Traveler Version 2 Fight Stick Bag",
            "https://cdn.shopify.com/s/files/1/0748/3745/products/05-SR.png?v=1506111154",
            "After the sell out of our first RYU FS Traveler, we went back to the drawing board with the designers at SPLITFRAME LLC to create a fight stick bag that exceeds the original in quality, performance and most importantly, design.  As part of SPLITFRAME LLC's vision of their FGC Premium Street Wear lineup, this bag uses a high quality quilted material to match today's street style found in sneakers, pants and jackets",
            67890, 
            89.98, 
            150
        );