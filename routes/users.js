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
  const { username, password, email } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    await db(
      `INSERT INTO users (username, password, email) VALUES ("${username}", "${hash}", "${email}")`
    );

    res.send({ message: "Registration successful" });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      if (err.message.includes('username')) {
        // Error de duplicado del username
        return res.status(400).send({ message: "Username is already taken." });
      } else if (err.message.includes('email')) {
        // Error de duplicado del email
        return res.status(400).send({ message: "Email is already registered." });
      }
    }

    res.status(500).send({ message: "Oops, something went wrong" });
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
      const user_id = user.id;

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
