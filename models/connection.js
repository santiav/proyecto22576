const mysql = require('mysql2');
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'proyecto22576',
    port: process.env.DB_PORT || 3306
});

connection.connect(err => {
    if (err) throw err
    console.log('DB esta conectada')
});

// truco para mantener la conexión

setInterval(function () {
    connection.query('SELECT 1');
   // console.log("manteniendo viva la conexion")
}, 50000);

module.exports = connection;