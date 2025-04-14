import dotenv from 'dotenv';
import pkg from 'pg';

const { Pool } = pkg;
dotenv.config();


const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20,  
  idleTimeoutMillis: 30000,  
  connectionTimeoutMillis: 2000,  
});

async function connectToPostgres() {
  try {
    await pool.connect();  // Connect to the database
    console.log('✅ Connected to PostgreSQL successfully.');
  } catch (err) {
    console.log('❌ Error connecting to PostgreSQL:', err.message);
  }
}

connectToPostgres();

export { pool };
