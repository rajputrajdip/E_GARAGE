// routes/UserRoutes.js
const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getAllUsers } = require("../controllers/UserController");


// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get all users (admin only)
router.get("/all", getAllUsers);

module.exports = router;