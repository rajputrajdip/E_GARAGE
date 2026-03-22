const express = require("express");
const router = express.Router();

// LOGOUT
router.post("/logout", (req, res) => {
  // Clear cookie (if JWT is stored in cookies)
  res.clearCookie("token"); // if using cookies
  return res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
