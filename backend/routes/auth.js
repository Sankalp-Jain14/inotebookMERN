const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Harrayisagood$boy";

// Route 1 Create a user using:POST "/api/auth/".No Login required // sign up karne ke liye random user aa sakta h
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Passwords must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //check wheter the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10); // genrating a salt
      const secPass = await bcrypt.hash(req.body.password, salt); //password ke andar hash dalna ka tarika
      // Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      console.log(authtoken);

      res.json({ authtoken });   //"authtoken": "example-jwt-value"
      // res.json(user);
    } catch (error) {
      //catch errors
      console.error(error.message);
      res.status(500).send("Inernal server Error");
    }
  }
);

// Route - 2 Authenticate a User using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // If there are errors return bad request and the errors
    const errors = validationResult(req); // wo req le raha h aur req ke andar h body aur body me hai (email aur password) jo bhi error ayega wo array ke form me mil jayega
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body; // req.body ke andar se email aur password nikala aur ise hi hum destructuring bolte h
    try {
      let user = await User.findOne({ email }); //User ko le rahe ho
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password); //compare kiya abhi ke password ko aur database me present password ko
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id, //database se user id li h
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET); //bar bar login na karna pade  , token header me lag gaya
      res.json({ authtoken });
    } catch (error) {
      //catch errors
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 3 Get logged in yser details using : POST "/api/auth/getuser".Login required
router.post("/getuser",fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
