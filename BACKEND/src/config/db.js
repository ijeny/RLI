const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ijeny46",
    port: 3307,
    database: "projectifk",
});

db.connect((err) => {
    if (err) {
        console.error("Koneksi gagal:", err);
        return;
    }

    console.log("Database berhasil terhubung!");
});

module.exports = db;