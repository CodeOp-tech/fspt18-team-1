var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/********* PLACES **********/
/* GET ALL - todos los places de la BBDD*/
router.get("/", (req, res) => {
  // llama a la lista completa de places atraves de la funcion db
  db("SELECT * FROM places ORDER BY id ASC;")
      .then(results => {
          res.send(results.data);
      })
      .catch(error => res.status(500).send(error));
});

/* POST - añade un nuevo place */
router.post("/", async (req, res) => {
  try {
      //el body que contiene la data a subir
      const body = req.body;
      //si no hay error se inserta en la tabla la data del body
      const sql = `INSERT INTO places (trip_id,name,coordinates,day,date,description) VALUES ('${body.trip_id}','${body.name}','${body.coordinates}','${body.day}','${body.date}','${body.description}');`; //actualizar parametros
      //se adiciona a la tabla usando la funcion db y como parametros se da sql
      await db(sql)
      // Envía una respuesta de éxito con el código 201
      res.sendStatus(201);
  } catch (error) {
      // Si ocurre un error, envía una respuesta de error con el código 500
      console.error(error);
      res.sendStatus(500);
  };
});

/* PUT - edita un trip */
router.put("/:place_id", async (req, res) => {
  try {
      ///el body que contiene la data a actualizar
      const body = req.body;
      // Los parámetros de la URL que están disponibles en req.params
      const id = req.params.place_id;
      //si no hay error se actualiza trips segun el body recibido
      const sql = `UPDATE places SET name = '${body.name}', coordinates = '${body.coordinates}', day = '${body.day}', date = '${body.date}', description = '${body.description}' WHERE id = ${id};`;
      await db(sql);
      // Envía una respuesta de éxito con el código 201
      res.sendStatus(201);
  } catch (error) {
      // Si ocurre un error, envía una respuesta de error con el código 500
      console.error(error);
      res.sendStatus(500);
  };
});

/* DELETE - elimina una trip */
router.delete("/:place_id", async (req, res) => {
  try {
      // Los parámetros de la URL están disponibles en req.params
      const id = req.params.place_id;
      const sql = `DELETE FROM places WHERE id = ${id};`;
      await db(sql);
      // Envía una respuesta de éxito con el código 201
      res.sendStatus(201);
  } catch (error) {
      // Si ocurre un error, envía una respuesta de error con el código 500
      console.error(error);
      res.sendStatus(500);
  };
});



module.exports = router;
