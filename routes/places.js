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
  db()
})

module.exports = router;
