var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/********* TRIPS **********/
/* GET ALL - todos los trips de la BBDD*/
router.get("/", (req, res) => {
    // llama a la lista completa de trips atraves de la funcion db
    db("SELECT * FROM trips ORDER BY id ASC;")
        .then(results => {
            res.send(results.data);
        })
        .catch(error => res.status(500).send(error));
});

/* GET by Id - todos los trips de la BBDD*/
router.get("/:trip_id", (req, res) => {
     // Obtén el ID del viaje desde los parámetros de la URL
     const tripId = req.params.trip_id;
    // llama a la lista completa de trips atraves de la funcion db
    db(`SELECT * FROM trips WHERE id =${tripId};`)
        .then(results => {
            res.send(results.data);
        })
        .catch(error => res.status(500).send(error));
});


/* POST - añade una nueva trip */
router.post("/", async (req, res) => {
    try {
        //el body que contiene la data a subir
        const body = req.body;
        //si no hay error se inserta en la tabla la data del body
        const sql = `INSERT INTO trips (user_id,name,coordinates,date,description) VALUES ('${body.user_id}','${body.name}','${body.coordinates}','${body.date}','${body.description}');`; //actualizar parametros
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
router.put("/:trip_id", async (req, res) => {
    try {
        ///el body que contiene la data a actualizar
        const body = req.body;
        // Los parámetros de la URL que están disponibles en req.params
        const id = req.params.trip_id;
        //si no hay error se actualiza trips segun el body recibido
        const sql = `UPDATE trips SET name = '${body.name}', coordinates = '${body.coordinates}', date = '${body.date}', description = '${body.description}' WHERE id = ${id};`;
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
router.delete("/:trip_id", async (req, res) => {
    try {
        // Los parámetros de la URL están disponibles en req.params
        const id = req.params.trip_id;
        const sql = `DELETE FROM trips WHERE id = ${id};`;
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