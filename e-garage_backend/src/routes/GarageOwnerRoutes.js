const router = require("express").Router();
const garageOwnerController = require("../controllers/GarageOwnerController");

// REGISTER
router.post("/register", garageOwnerController.registerGarageOwner);

// LOGIN
router.post("/login", garageOwnerController.loginGarageOwner);

// GET ALL
router.get("/getallgarageowner", garageOwnerController.getAllGarageOwner);

// GET BY ID
router.get("/getgarageownerbyid/:id", garageOwnerController.getGarageOwnerById);

// UPDATE
router.put("/updategarageowner/:id", garageOwnerController.updateGarageOwner);

// DELETE
router.delete("/deletegarageowner/:id", garageOwnerController.deleteGarageOwner);

module.exports = router;