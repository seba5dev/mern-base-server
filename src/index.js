const express = require("express");
const app = express();
const cors = require("cors");

// Settings
app.set("port", process.env.PORT || 5000);

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/api/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/employees", require("./routes/employees"));
app.use("/api/clients", require("./routes/clients"));

// Server
app.listen(app.get("port"), () => {
  console.log("Servidor abierto en el puerto " + app.get("port"));
});
