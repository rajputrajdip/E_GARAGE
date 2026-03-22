const express = require("express");
const router = express.Router();
const garageOwnerController = require("../controllers/GarageOwnerController");
const validateToken = require("../Middleware/AuthMiddleware"); // ✅ import

// ✅ APPLY middleware here
router.get("/garages", validateToken, garageOwnerController.getMyGarages);
router.post("/garages", validateToken, garageOwnerController.createGarage);
router.put("/garages/:id", validateToken, garageOwnerController.updateGarage);
router.delete("/garages/:id", validateToken, garageOwnerController.deleteGarage);

router.get("/bookings", validateToken, garageOwnerController.getMyBookings);

module.exports = router;