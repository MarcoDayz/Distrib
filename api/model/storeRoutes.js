import { Router } from "express";
import pool from "../localPool.js";
const storeRoute = Router();

//route to get all stores
storeRoute.get('/all-stores', async (req, res) => {
    try {
        const {rows} = await pool.query('SELECT DISTINCT stores.store_id, stores.store_name, stores.store_street, stores.store_city, stores.store_zip, stores.store_phone, SUM(orders.order_total) OVER(PARTITION BY stores.store_id) AS store_totalsales FROM stores LEFT JOIN orders ON stores.store_id = orders.store_id GROUP BY stores.user_id, stores.store_name, stores.store_id, orders.order_total, stores.store_street, stores.store_city, stores.store_zip, stores.store_phone ORDER BY stores.store_name')
        res.send(rows)
        // res.send('this is the all stores route')
    } catch (error) {
        res.send(error)
    }
});
//route to get user stores upon login
storeRoute.get('/all-stores/:id', async (req, res) => {
    const {id} = req.params
    try {
        const {rows} = await pool.query(`SELECT DISTINCT stores.store_id, stores.user_id, stores.store_name, stores.store_street, stores.store_city, stores.store_zip, stores.store_phone, SUM(orders.order_total) OVER(PARTITION BY stores.store_id) AS store_totalsales FROM stores LEFT JOIN orders ON stores.store_id = orders.store_id WHERE stores.user_id = $1 GROUP BY stores.user_id, stores.store_name, stores.store_id, orders.order_total, stores.store_street, stores.store_city, stores.store_zip, stores.store_phone ORDER BY stores.store_name`, [id]);
        res.send(rows)
    } catch (error) {
        res.send(error)
    }
});

//Route to orders by store id
storeRoute.get('/orderhistory/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {rows} = await pool.query(`SELECT order_id,TO_CHAR(order_date, 'mm/dd/yyyy'), order_salesperson, order_total, store_id, user_id FROM orders WHERE store_id = $1 ORDER BY order_serial DESC`, [id])
        if(rows.length === 0){
            res.send([{
                order_id: null,
                to_char: null,
                order_total: 0,
                store_id: null,
                user_id: null
            }])
        }else{
            res.send(rows)
        }
    } catch (error) {
        res.send(error)
    }
});

//Route for items by orderNum 
storeRoute.get('/purchase-items/:id', async (req, res) => {
    const {id} = req.params
    try {
        const {rows} = await pool.query(`SELECT * FROM purchases WHERE order_id = $1`, [id])
        res.send(rows)
    } catch (error) {
        res.send(error)
    }
});

//route to purchase items (new order)
storeRoute.put('/new-purchase', async (req, res) => {
    try {
        const {item_id, item_name, item_qty, item_price, order_id} = req.body
        const {rows} = await pool.query(`
        INSERT INTO purchases (
            item_id,
            item_name,
            item_qty,
            item_price,
            order_id
        )
        VALUES ($1, $2, $3,$4, $5)`, [item_id, item_name, item_qty, item_price, order_id])
        res.send(req.body)
    } catch (error) {
        res.send(error)
    }
});

//route to make order (new order)
storeRoute.put('/new-order', async (req, res) => {
    try {
        const {order_id, order_total, order_date, order_salesperson, user_id, store_id} = req.body
        await pool.query(`INSERT INTO orders (
            order_id,
            order_total,
            order_date,
            order_salesperson,
            user_id,
            store_id
        )
        VALUES ($1, $2, $3, $4, $5, $6)`, [order_id, order_total, order_date, order_salesperson, user_id, store_id])
        res.send('Order Added')
    } catch (error) {
        res.send(error)
    }

});

export default storeRoute;