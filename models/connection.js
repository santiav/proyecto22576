const mysql = require('mysql2');
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'proyecto22576',
    port: process.env.DB_PORT || 3306
});

connection.connect();
module.exports = connection;