DELETE FROM purchases;
DELETE FROM orders;
DELETE FROM products;
DELETE FROM stores;
DELETE FROM accounts;

--dummy account
INSERT INTO accounts (
    user_firstName,
    user_lastName,
    user_email,
    user_password
)
VALUES (
    'Mark',
    'Diaz',
    'marco@example.com',
    '$2b$10$zsaDJS9rkcqELySBnqshcukGJ2LNd.gs38AQ08zdOdcvRT.MyaYCi'
);

-- dummy stores
INSERT INTO stores (
    store_id,
    user_id,
    store_name,
    store_street,
    store_city,
    store_zip,
    store_phone
)
VALUES (
    'MAV01',
    1,
    'Mavericks',
    'Mavericks St',
    'Mesquite',
    89027,
    1232344567
),(
    '71101',
    1,
    '711',
    '711 St',
    'Mesquite',
    89027,
    1234567890
),(
    'SHE01',
    1,
    'Shell',
    'Shell St',
    'Mesquite',
    89027,
    1987654321
),(
    'CHE01',
    1,
    'Chevron',
    'Chevron St',
    'Mesquite',
    89027,
    1987654321
),(
    'CAS01',
    1,
    'Casablanca',
    'Casablanca St',
    'Mesquite',
    89027,
    1987654321
);

--dummy products
INSERT INTO products (
    product_brand,
    product_name,
    product_weight,
    product_price,
    product_discountprice,
    product_qty
)
VALUES (
    'Corona Extra',
    'Corona Bottle Single',
    '12oz',
    3.50,
    3.00,
    400
),
(
    'Corona Extra',
    'Corona Bottle 6pck',
    '12oz',
    9.50,
    8.00,
    300
),
(
    'Corona Extra',
    'Corona Can Single',
    '12oz',
    2.00,
    1.50,
    650
);


--dummy orders
-- INSERT INTO orders (
--     order_id,
--     order_total,
--     order_date,
--     order_salesperson,
--     user_id,
--     store_id
-- )
-- VALUES (
--     20,
--     665.21,
--     '2/25/2023',
--     'Mark',
--     1,
--     'MAV01'
-- ),(
--     30,
--     840.15,
--     '2/24/2023',
--     'Mark',
--     1,
--     'MAV02'
-- ),(
--     40,
--     7840.50,
--     '2/25/2023',
--     'Mark',
--     1,
--     'MAV01'
-- ),(
--     50,
--     8640.50,
--     '2/27/2023',
--     'Mark',
--     1,
--     'MAV01'
-- ),(
--     2435,
--     665.20,
--     '2/24/2023',
--     'Mark',
--     1,
--     '71101'
-- ),(
--     334,
--     840.15,
--     '2/22/2023',
--     'Mark',
--     1,
--     '71101'
-- ),(
--     4354,
--     7840.50,
--     '2/25/2023',
--     'Mark',
--     1,
--     'SHE01'
-- );

--dummy purchases
-- INSERT INTO purchases (
--     item_id,
--     item_name,
--     item_qty,
--     item_price,
--     order_id
-- )
-- VALUES (
--     2,
--     'Corona Bottle 6pck',
--     70,
--     665.00,
--     20
-- ),(
--     2,
--     'Corona Bottle 6pck',
--     70,
--     665.00,
--     30
-- ),(
--     1,
--     'Corona Bottle Single',
--     50,
--     175.00,
--     30
-- );

-- Stores and Totals
-- SELECT DISTINCT stores.store_id, stores.user_id, stores.store_name, stores.store_street, stores.store_city, stores.store_zip, stores.store_phone, SUM(orders.order_total) OVER(PARTITION BY stores.store_id) AS store_totalsales FROM stores LEFT JOIN orders ON stores.store_id = orders.store_id GROUP BY stores.user_id, stores.store_name, stores.store_id, orders.order_total, stores.store_street, stores.store_city, stores.store_zip, stores.store_phone;

-- Stores Total by user id
-- SELECT DISTINCT stores.store_id, stores.user_id, stores.store_name, stores.store_street, stores.store_city, stores.store_zip, stores.store_phone, SUM(orders.order_total) OVER(PARTITION BY stores.store_id) AS store_totalsales FROM stores LEFT JOIN orders ON stores.store_id = orders.store_id WHERE stores.user_id = 1 GROUP BY stores.user_id, stores.store_name, stores.store_id, orders.order_total, stores.store_street, stores.store_city, stores.store_zip, stores.store_phone;

-- Order Queries
-- SELECT * FROM orders WHERE store_id = 1;

-- Purchase Queries
-- SELECT * FROM purchases WHERE order_id = 30 ORDER BY item_id ASC;

-- Total Sales Query (all orders sum)
-- SELECT SUM(order_total) OVER(ORDER BY store_id) FROM orders ORDER BY sum DESC LIMIT 1;

-- Total Sales Broken down by stores
-- Select *, SUM(order_total) OVER(PARTITION BY store_id) FROM orders;

-- Total Sales from one store
-- SELECT *, SUM(order_total) OVER(PARTITION BY store_id ORDER BY order_id) FROM orders WHERE store_id = 1;