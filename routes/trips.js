var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/********* TRIPS **********/
/* GET ALL - todos los trips de la BBDD*/
router.get("/",(req,res)=>{
    // llama a la lista completa de trips atraves de la funcion db
    db("SELECT * FROM trips ORDER BY id ASC;")
        .then(results =>{
            res.send(results.data);
        })
        .catch(error => res.status(500).send(error));
  });

/* POST - añade una nueva trip */
router.post("/", async(req,res)=>{
    try{
        //el body que contiene la data a subir
        const body = req.body;
        console.log("eso es el body de trips",body.user_id,body.name,body.coordinates,body.date,body.description);
        //si no hay error se inserta en la tabla la data del body
        const sql = `INSERT INTO trips (user_id,name,coordinates,date,description) VALUES ('${body.user_id}','${body.name}','${body.coordinates}','${body.date}','${body.description}');`; //actualizar parametros
        //se usa el try and catch para volver a hacer un get de las trips actualizada con la trip adicionada.
        await db(sql)
        // Envía una respuesta de éxito con el código 201
            res.sendStatus(201);
    }catch (error) {
        // Si ocurre un error, envía una respuesta de error con el código 500
        console.error(error);
        res.sendStatus(500);
    };
    });

module.exports = router;
