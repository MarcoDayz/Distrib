import { Router } from 'express';
import pool from '../localPool.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const auth = Router()

auth.post('/sign-up', async (req, res) => {
    const {email, firstName, lastName, confirmPassword} = req.body
    try {
        const {rows} = await pool.query(`Select * from accounts where user_email = $1`, [email])
        if(rows.length !== 0){
            res.json({
                error: 'Account already exists',
                auth: false
            })
        }else{
            const saltRounds = 10
            const hashedPW = await bcrypt.hash(confirmPassword, saltRounds)
            await pool.query(`Insert into accounts (user_firstName, user_lastName, user_email, user_password) values($1,$2,$3,$4)`,[firstName, lastName, email, hashedPW])
            res.json({
                error: 'SuccessFully Created New Account',
                auth: true
            })
        }
    } catch (error) {
        console.log(error.message)
    }
});

//created authentication function
auth.post('/sign-in', async (req, res) => {
    const {email, password} = req.body
    const {rows} = await pool.query(`select * from accounts where user_email = $1`,[email])
    if(rows.length === 0){
        res.json({
            error: 'Account does not exist',
            auth: false
        })
    }else{
        const user = rows[0]
        try {
            const validate = await bcrypt.compare(password, user.user_password)
            if(!validate){
                res.json({
                    error: 'Incorrect Password',
                    auth: false
                })
            }else{
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN)
                res.send({
                    accessToken: accessToken,
                    message: 'Successfully Sign In',
                    auth: true,
                    userName: user
                })
            }
        } catch (error) {
            console.log(error.message)
        }
    }
});

export default auth;