const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "honeytwix1801",
    database: "employees_db",
}
    // console.log("You're connected to the database")
);

db.connect(function(err){
    if (err) throw err
});

module.exports = db