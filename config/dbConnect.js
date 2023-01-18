const mysql = require('mysql')

const db = mysql.createConnection({
    port:process.env.PORT,
    host:process.env.HOST,
    user:"root",
    password:'',
    database:process.env.DATABASE,
    connectionLimit:10
})

module.exports = db