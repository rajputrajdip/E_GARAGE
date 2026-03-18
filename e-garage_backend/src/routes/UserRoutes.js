// const router = require("express").Router()
// const usercontroller = require("../controllers/UserController")

// router.post("/register",usercontroller.registeruser)
// router.post("/login",usercontroller.loginUser)
// module.exports = router




// src/routes/UserRoutes.js
const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/UserController");

// Register new user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

module.exports = router;