import { config } from 'dotenv';
import pkg from 'pg';
config('.env')

const {Pool} = pkg;

const pool = new Pool({
    // user: process.env.DB_USERNAME,
    // host: 'localhost',
    // database: process.env.DB_DATABASE,
    // port: 5432,
    // password: process.env.DB_PASSWORD
    
    //Environmenet Variable from onrender
    connectionString: process.env.DATABASE_URL
});

export default pool;