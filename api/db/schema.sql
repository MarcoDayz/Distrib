DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS stores CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS purchases;

CREATE TABLE accounts (
    user_id SERIAL PRIMARY KEY,
    user_firstName TEXT,
    user_lastName TEXT,
    user_email TEXT UNIQUE,
    user_password TEXT
);

CREATE TABLE stores (
    store_id VARCHAR(5) NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES accounts(user_id),
    store_name TEXT,
    store_street TEXT,
    store_city TEXT,
    store_zip INTEGER,
    store_phone VARCHAR(10)
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_brand TEXT,
    product_name TEXT,
    product_weight TEXT,
    product_price DECIMAL(19,2),
    product_discountprice DECIMAL(19,2),
    -- product_img TEXT NULL,
    product_qty INTEGER
);

CREATE TABLE orders (
    order_serial SERIAL NOT NULL,
    order_id INTEGER UNIQUE PRIMARY KEY,
    order_total DECIMAL(19,2) NOT NULL,
    order_date DATE NOT NULL,
    order_salesperson TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES accounts(user_id),
    store_id VARCHAR(5) NOT NULL
    -- FOREIGN KEY (store_id) REFERENCES stores(store_id)
);

CREATE TABLE purchases (
    item_id INTEGER NOT NULL,
    FOREIGN KEY (item_id) REFERENCES products(product_id),
    item_name TEXT NOT NULL,
    item_qty INTEGER NOT NULL,
    item_price DECIMAL(19,2) NOT NULL,
    order_id INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);