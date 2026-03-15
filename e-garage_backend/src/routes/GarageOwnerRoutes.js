const router = require ("express").Router()
const GarageOwnercontroller = require("../controllers/GarageOwnerController")
router.post("/register",garageOwnercontroller.registergarageowner)
router.post("/login",garageOwnercontroller.logigarageowner)
router.get("/getallgarageowner",garageOwnercontroller.getallgarageowner)    
router.get("/getgarageownerbyid/:id",garageOwnercontroller.getgarageownerbyid)
router.put("/updategarageowner/:id",garageOwnercontroller.updategarageowner)
router.delete("/deletegarageowner/:id",garageOwnercontroller.deletegarageowner)

module.exports = router
