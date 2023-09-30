var express = require('express');
var router = express.Router();
const db = require("../model/helper");
// const multer = require('multer');
// const fs = require('fs');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/images'); // this is the one Specify the destination directory
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname); // Use the original filename
//     }
//   });
//   const upload = multer({ storage: storage });


/********* IMAGES **********/

/* GET by Id */
router.get("/:trip_id", (req, res) => {
     // Obtén el ID del viaje desde los parámetros de la URL
     const tripId = req.params.trip_id;
    // llama a la lista completa de trips atraves de la funcion db
    db(`SELECT * FROM images WHERE trip_id = ${tripId};`)
        .then(results => {
            res.send(results.data);
        })
        .catch(error => res.status(500).send(error));
});

module.exports = router;