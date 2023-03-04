import { Router } from "express";
import pool from "../localPool.js";
const products = Router()

products.get('/products', async (req, res) => {
    try {
        const {rows} = await pool.query(`SELECT * FROM products`)
        res.send(rows)
    } catch (error) {
        res.send(error)
    }
})

export default products;