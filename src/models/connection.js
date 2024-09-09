const { Pool } = require('pg');
require('dotenv').config();


const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB,
    port: process.env.PG_PORT, 
});

module.exports = pool;
