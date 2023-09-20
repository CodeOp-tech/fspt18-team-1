var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
var db = require("../model/helper");
require("dotenv").config();
var bcrypt = require("bcrypt");
const saltRounds = 10;

const supersecret = process.env.SUPER_SECRET;

/* POST users register */
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    await db(
      `INSERT INTO users (username, password) VALUES ("${username}", "${hash}")`
    );

    res.send({ message: "You are sucessfully registered"});
    } catch (err) {
      res.status(400).send({message: "Oops something went wrong"})
    }
});

/*POST login*/
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const results = await db(
      `SELECT * FROM users WHERE user = "${username}"`
    );
    const user = results.data[0];
    if(user) {
      const user_id = traveller.id;

      const correctPassword = await bcrypt.compare(password, user.password);
      if (!correctPassword) throw new Error("Incorrect password");

      var token = jwt.sign({ user_id }, supersecret);
      res.send({ message: "You are in! ;)", token });
    } else {
      throw new Error("Traveler does not exist :(");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
})

/* GET user profile */

router.get("/profile", userShouldBeLoggedIn, (req, res) => {
  res.send({
    message: "Here is the PROTECTED data for user " + req.traveler_id,
  });
})

module.exports = router;
