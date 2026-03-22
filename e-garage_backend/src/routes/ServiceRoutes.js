const router = require("express").Router();
const serviceController = require("../controllers/ServiceController");

router.post("/create", serviceController.createService);
router.get("/garage/:garageId", serviceController.getServiceByGarage);
router.post("/add", serviceController.addService);

module.exports = router;