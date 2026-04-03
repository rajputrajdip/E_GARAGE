const router = require("express").Router();
const garageController = require("../controllers/GarageController");
const upload = require("../Middleware/upload");
const validateToken = require("../Middleware/AuthMiddleware");

router.post(
  "/add",
  validateToken,                 // ✅ ADD THIS
  upload.single("image"),
  garageController.createGarage
);
router.get("/all", garageController.getAllGarages);
router.get("/:id", garageController.getGarageById);
router.put("/status/:id", garageController.updateGarageStatus);
router.post("/add", upload.single("image"), garageController.createGarage);

module.exports = router;

