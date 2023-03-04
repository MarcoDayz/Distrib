import express from 'express';
import cors from 'cors';
import storeRoute from './model/storeRoutes.js';
import auth from './auth/authRoutes.js';
import products from './model/productsRoute.js';
const app = express()

const port = 4000;

app.use(cors())
app.use(express.json())

// app.get("/", (req, res) => {
//     res.send("Hello World from Server!")
// });

app.use('/stores', storeRoute)
app.use('/inventory', products)
app.use('/account', auth)

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});