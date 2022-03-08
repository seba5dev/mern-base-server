const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3309,
  user: "root",
  password: "1234",
  database: "mern-base",
});

connection.connect((err) => {
  if (err) {
    console.log("Error conectando a la base de datos\n", err);
    return;
  }
  console.log("Conexión a la base de datos establecida");
});

module.exports = connection;
