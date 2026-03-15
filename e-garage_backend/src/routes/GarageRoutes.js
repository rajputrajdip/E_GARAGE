const router = require("express").Router()
const garageController = require("../controllers/GarageController")

router.post("/garage", garageController.createGarage)

router.get("/garage", garageController.getGarages)

router.delete("/garage/:id", garageController.deleteGarage)

module.exports = router