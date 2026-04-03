// const express = require("express");
// const router = express.Router();
// const garageOwnerController = require("../controllers/GarageOwnerController");
// const validateToken = require("../Middleware/AuthMiddleware"); // ✅ import
// const upload = require("../Middleware/upload");
// const auth = require("../Middleware/AuthMiddleware");   

// const { createGarage } = require("../controllers/GarageController");


// // ✅ APPLY middleware here
// router.get("/garages", validateToken, garageOwnerController.getMyGarages);
// router.post("/garages", validateToken, garageOwnerController.createGarage);
// router.put("/garages/:id", validateToken, garageOwnerController.updateGarage);
// router.delete("/garages/:id", validateToken, garageOwnerController.deleteGarage);

// router.get("/bookings", validateToken, garageOwnerController.getMyBookings);


// router.post("/garages", auth, upload.single("image"), garageOwnerController.createGarage);

// module.exports = router;


const express = require("express");
const router = express.Router();

const garageOwnerController = require("../controllers/GarageOwnerController");
const auth = require("../Middleware/AuthMiddleware");
const upload = require("../Middleware/upload");

// ✅ GET GARAGES
router.get("/garages", auth, garageOwnerController.getMyGarages);

// ✅ ADD GARAGE (WITH IMAGE 🔥)
router.post(
  "/garages",
  auth,
  upload.single("image"),
  garageOwnerController.createGarage
);

// ✅ UPDATE
router.put("/garages/:id", auth, garageOwnerController.updateGarage);

// ✅ DELETE
router.delete("/garages/:id", auth, garageOwnerController.deleteGarage);

// ✅ BOOKINGS
router.get("/bookings", auth, garageOwnerController.getMyBookings);
router.get("/garages-with-owners", garageOwnerController.getGaragesWithOwnerName);

module.exports = router;