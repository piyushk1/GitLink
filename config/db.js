const { Pool } = require('pg');  
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.DB_SSL_CERTIFICATE,
  },
});

async function connectToDatabase() {
  try {
    const result = await pool.query('SELECT VERSION()');
    console.log("Connected to database");
    console.log('PostgreSQL version:', result.rows[0].version);
  } catch (err) {
    console.error('Error:', err.stack);
  }
}

connectToDatabase();

module.exports = pool;  
