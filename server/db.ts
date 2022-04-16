const mysql = require('mysql2');
require('dotenv').config()

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "tournages"
});
