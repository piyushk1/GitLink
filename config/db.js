const { Pool } = require('pg');  // Import Pool for connection pooling
const dotenv = require('dotenv');

// Load environment variables
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

// Don't manually call `end` here, connection pooling handles it.
connectToDatabase();

module.exports = pool;  // Export the pool instead of the client

