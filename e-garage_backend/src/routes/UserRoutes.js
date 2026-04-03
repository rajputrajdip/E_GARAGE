// routes/UserRoutes.js
const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getAllUsers ,getMyProfile ,updateProfile} = require("../controllers/UserController");
const auth = require("../Middleware/AuthMiddleware");
const upload = require("../Middleware/upload");


// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get all users (admin only)
router.get("/all", getAllUsers);

// Get my profile
router.get("/profile",auth, getMyProfile);

router.put("/profile", auth, updateProfile);

upload.single("image")

module.exports = router;