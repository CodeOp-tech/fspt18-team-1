var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET Database listening */
router.get('/', function(req, res, next) {
  res.send('welcome to the API');
});

/********* TRIPS **********/

/* GET ALL - todos los proyectos de la BBDD*/
router.get("/trips",(req,res)=>{
    // llama a la lista completa de trips atraves de la funcion db
    db("SELECT * FROM trips ORDER BY id ASC;")
        .then(results =>{
            res.send(results.data);
        })
        .catch(error => res.status(500).send(error));
  });

/* POST - añade una nueva trip */
router.post("/trips", async(req,res)=>{
    //el body que contiene la data a subir
    const body = req.body;
    //si no hay error se inserta en la tabla la data del body
    const sql = `INSERT INTO tips (name, user_id) VALUES ('${body.name}',${body.user_id});`; //actualizar parametros
    //se usa el try and catch para volver a hacer un get de las trips actualizada con la trip adicionada.
    db(sql)
    .then(results =>{
        res.status(201);
    })
    .catch (error => res.send(500).send(error));
    });

module.exports = router;
