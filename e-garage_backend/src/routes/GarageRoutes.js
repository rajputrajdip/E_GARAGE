const router = require("express").Router();
const garageController = require("../controllers/GarageController");

router.post("/create", garageController.createGarage);
router.get("/all", garageController.getAllGarages);
router.get("/:id", garageController.getGarageById);
router.put("/status/:id", garageController.updateGarageStatus);

module.exports = router;