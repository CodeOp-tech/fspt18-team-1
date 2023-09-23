var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET Database listening */
router.get('/', function(req, res, next) {
  res.send('welcome to the API');
});



module.exports = router;
