const express = require("express");
const router = express.Router();
const connection = require("../database");

router.get("/getAll", (req, res) => {
  connection.query("SELECT * FROM employees", (err, rows, fields) => {
    if (err) {
      res.status(500).send({
        message: "Error al obtener los registros" + err,
      });
    } else {
      res.json(rows);
    }
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM clients WHERE id = ?",
    [id],
    (err, rows, fields) => {
      if (err) {
        res.status(500).send({
          message: "Error al obtener el registros" + err,
        });
      } else {
        res.json(rows[0]);
      }
    }
  );
});

router.post("/create", (req, res) => {
  const { name, number } = req.body;
  const query = "INSERT INTO clients(name, number) VALUES (?, ?)";
  connection.query(query, [name, number], (err, rows, fields) => {
    if (err) {
      res.status(500).send({
        message: "Error al crear el usuario" + err,
      });
    } else {
      res.json({
        message: "Usuario creado con éxito",
      });
    }
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, number } = req.body;
  const query = `
		CALL userAddOrEdit(?, ?, ?);
	`;
  connection.query(query, [id, name, age], (err, rows, fields) => {
    if (err) {
      res.status(500).send({
        message: "Error al actualizar el usuario" + err,
      });
    } else {
      res.json({
        message: "Usuario actualizado con éxito",
      });
    }
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM employees WHERE id = ?";
  connection.query(query, [id], (err, rows, fields) => {
    if (err) {
      res.status(500).send({
        message: "Error al eliminar el usuario" + err,
      });
    } else {
      res.json({
        message: "Usuario eliminado con éxito",
      });
    }
  });
});

module.exports = router;
