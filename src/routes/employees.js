const express = require("express");
const router = express.Router();
const connection = require("../database");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM employees", (err, rows, fields) => {
    if (err) {
      res.status(500).send({
        message: "Error al obtener los usuarios" + err,
      });
    } else {
      res.json(rows);
    }
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM employees WHERE id = ?",
    [id],
    (err, rows, fields) => {
      if (err) {
        res.status(500).send({
          message: "Error al obtener el usuario" + err,
        });
      } else {
        res.json(rows[0]);
      }
    }
  );
});

router.post("/create", (req, res) => {
  const { name, age, country, position, salary } = req.body;
  const query =
    "INSERT INTO employees(nameEmployee, ageEmployee, countryEmployee, positionEmployee, salaryEmployee) VALUES (?, ?, ?, ?, ?)";
  connection.query(
    query,
    [name, age, country, position, salary],
    (err, rows, fields) => {
      if (err) {
        res.status(500).send({
          message: "Error al crear el usuario" + err,
        });
      } else {
        res.json({
          message: "Usuario creado con éxito",
        });
      }
    }
  );
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
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
