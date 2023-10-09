var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
var express = require('express');
var router = express.Router();
const db = require("../model/helper");
// mutler and storage to save the images
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const mime = require("mime-types");
const multer = require('multer');
const fs = require('fs');

//need to rename the file in await async
const { promisify } = require('util');
const renameAsync = promisify(fs.rename);

// Create a function to format the date as "YYYY-MM-DD"
function formatDateToHTMLCalendar(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

//Multer upload function of files  
const upload = multer({ dest: './public/images/' })

// to integrate in trips 
/********* IMAGES **********/

/* GET by Id */
router.get("/images/:trip_id", (req, res) => {
    // Obtén el ID del viaje desde los parámetros de la URL
    const tripId = req.params.trip_id;
    // llama a la lista completa de trips atraves de la funcion db
    db(`SELECT * FROM images WHERE trip_id = ${tripId};`)
        .then(results => {
            res.send(results.data);
        })
        .catch(error => res.status(500).send(error));
});


/********* TRIPS **********/
/* GET ALL - todos los trips de la BBDD*/
router.get("/", (req, res) => {
    // llama a la lista completa de trips atraves de la funcion db
    db("SELECT * FROM trips ORDER BY id ASC;")
        .then(results => {
            console.log(results.data)
            res.send(results.data);
        })
        .catch(error => res.status(500).send(error));
});

/* GET ALL from user id - todos los trips de la BBDD*/
router.get("/userTrips", userShouldBeLoggedIn ,(req, res) => {
    // Obtén el ID del usuario desde los parámetros de la URL
    const userId = req.user_id;
    // llama a la lista completa de trips atraves de la funcion db
    db(`SELECT * FROM trips WHERE user_id =${userId}`)
        .then(results => {
            console.log(results.data)
            res.send(results.data);
        })
        .catch(error => res.status(500).send(error));
});


/* GET by Id - trip de la BBDD*/
router.get("/:trip_id", async (req, res) => {
    //trip a enviar para editar un viaje
    const trip = {
        user_id: "",
        name: "",
        latitude: "",
        longitude: "",
        date: "",
        description: "",
        imageName: "",
        imageDescription: "",
    }

    // Obtén el ID del viaje desde los parámetros de la URL
    const tripId = req.params.trip_id;

    try {
        // llama a la lista de trips atraves de la funcion db
        const resultsTripCall = `SELECT * FROM trips WHERE id =${tripId};`
        const resultsTrip = await db(resultsTripCall);
        if (resultsTrip) {
            console.log("resultados de llamada a trip", resultsTrip.data)

            //transform date String to html readable date
            // Original date string
            const originalDateString = resultsTrip.data[0].date;
            // Parse the original date string into a JavaScript Date object
            const originalDate = new Date(originalDateString);
            // Format the date for HTML calendar input
            const formattedDate = formatDateToHTMLCalendar(originalDate);

            //trip a enviar para editar un viaje
            trip.user_id = resultsTrip.data[0].user_id;
            trip.name = resultsTrip.data[0].name;
            trip.latitude = resultsTrip.data[0].latitude;
            trip.longitude = resultsTrip.data[0].longitude;
            trip.date = formattedDate;
            trip.description = resultsTrip.data[0].description;
        };

        // llama a la lista de images atraves de la funcion db
        const resultsImagesCall = `SELECT * FROM images WHERE trip_id =${tripId};`
        const resultsImages = await db(resultsImagesCall);
        if (resultsImages.length) {
            console.log("resultados de llamada a images", resultsImages.data)
            trip.imageName = resultsImages.data[0].name;
            trip.imageDescription = resultsImages.data[0].description;
        };
        //enviar la data del trip
        res.send(trip);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


/* POST - añade una nueva trip */
//router post va a hacer un uplod de los archivos tambien ->upload.single('file')
router.post("/", upload.single('imageFile'), async (req, res) => {
    //el body que contiene la data a subir de trip
    try {
        const body = req.body;
        console.log("body request", body)
        //inserta en la tabla trips la data del trip
        const sqlCallOne = `INSERT INTO trips (user_id,name,latitude,longitude,date,description) VALUES (${body.user_id},'${body.name}',${body.latitude},${body.longitude},'${body.date}','${body.description}');`; //actualizar parametros
        await db(sqlCallOne)
        //se adiciona a la tabla usando la funcion db y como parametros se da sql
        // file is available at req.file
        const imagefile = req.file;
        if (imagefile) {
            // check the extension of the file
            const extension = mime.extension(imagefile.mimetype);

            // create a new random name for the file
            const filename = uuidv4() + "." + extension;

            // grab the filepath for the temporary file
            const tmp_path = imagefile.path;
            console.log("path temporal del file", tmp_path)

            // construct the new path for the final file
            const target_path = path.join(__dirname, "../public/images/") + filename;
            console.log("path definitivo del file", target_path)


            // rename the file
            // await fs.rename(tmp_path, target_path); --Andres using axios
            // rename the file
            await renameAsync(tmp_path, target_path);//chatgpt option

            
            const lasTrip_IdCall = await db(`SELECT MAX(id) FROM trips`)
            console.log("ULTIMA TRIP CAll", lasTrip_IdCall);
            const lasTrip_Id = lasTrip_IdCall.data[0]['MAX(id)'];
            console.log("ULTIMA TRIPPP Id", lasTrip_Id);
            // Insertar datos en la tabla "images" del imagan del trip
            const sqlCallTwo = `INSERT INTO images (name, trip_id, description) VALUES ('${filename}',${lasTrip_Id},'${body.imageDescription}');`
            await db(sqlCallTwo);
        }
        // Envía una respuesta de éxito con el código 201
        res.sendStatus(201);
    } catch (error) {
        // Si ocurre un error, envía una respuesta de error con el código 500
        console.error(error);
        res.sendStatus(500);
    };
});

/* PUT - edita un trip */
router.put("/:trip_id", upload.single('imageFile'), async (req, res) => {

    ///el body que contiene la data a actualizar
    const body = req.body;
    // Los parámetros de la URL que están disponibles en req.params
    const id = req.params.trip_id;

    // file is available at req.file
    const imagefile = req.file;
    // check the extension of the file
    const extension = mime.extension(imagefile.mimetype);

    // create a new random name for the file
    const filename = uuidv4() + "." + extension;

    // grab the filepath for the temporary file
    const tmp_path = imagefile.path;
    console.log("path temporal del file", tmp_path)

    // construct the new path for the final file
    const target_path = path.join(__dirname, "../public/images/") + filename;
    console.log("path definitivo del file", target_path)

    try {
        // Check if the trip exists and retrieve its current image information
        const trip = await db(`SELECT * FROM trips WHERE id = ${id}`);
        console.log("Trip", trip)
        const image = await db(`SELECT * FROM images WHERE trip_id = ${id}`);
        console.log("Image", image)
        if (!trip || !trip.data.length) {
            return res.status(404).json({ message: "Trip not found" });
        }

        // Delete the old image file if it exists
        if (image.data[0].name) {
            const oldImagePath = `public/images/${image.data[0].name}`;
            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }

        // rename the file
        await renameAsync(tmp_path, target_path);//chatgpt option

        //si no hay error se actualiza trips segun el body recibido
        const sqlTripCall = `UPDATE trips SET name = '${body.name}', latitude = ${body.latitude}, longitude = ${body.longitude}, date = '${body.date}', description = '${body.description}' WHERE id = ${id};`;
        await db(sqlTripCall);
        const sqlImageCall = `UPDATE images SET name ='${filename}', trip_id = ${id}, description = '${body.imageDescription}' WHERE trip_id = ${id};`
        await db(sqlImageCall);
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
        console.log("trip id", id)
        const sqlCallOne = `SELECT * FROM images WHERE trip_id = ${id};`;
        const resultsqlCallOne = await db(sqlCallOne);
        const image = resultsqlCallOne.data[0]
        console.log("result de eliminar una imagen", image)
        //File to delete path
        if (image) {
            const filePath = `public/images/${image.name}`;
            //Delete file
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(err);
                    throw new Error('Image delete error!' + err);
                }
            });
        }
        const sqlCallTwo = `DELETE FROM trips WHERE id = ${id};`
        await db(sqlCallTwo);
        // Envía una respuesta de éxito con el código 201
        res.status(200).send('File, image and trip deleted successfully');
    } catch (error) {
        // Si ocurre un error, envía una respuesta de error con el código 500
        console.error(error);
        res.sendStatus(500);
    };
});

module.exports = router;
