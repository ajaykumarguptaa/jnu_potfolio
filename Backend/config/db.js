import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

// Step 1: Connect without specifying database (to create it if missing)
const init = async () => {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS
    });

    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
    console.log(`Database '${DB_NAME}' exists or was created.`);

    await connection.end();
  } catch (err) {
    console.error("Error creating database:", err.message);
    process.exit(1);
  }
};

await init();

// Step 2: Create pool for the database
const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Step 3: Test connection
const testConnection = async () => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS now");
    console.log("MySQL Connected. Server time:", rows[0].now);
  } catch (err) {
    console.error("MySQL Connection Error:", err.message);
    process.exit(1);
  }
};

testConnection();

export default pool;

