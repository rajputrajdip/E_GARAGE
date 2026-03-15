const router = require("express").Router()
const servicecontroller = require("../controllers/ServiceController")
router.post("/addservice",servicecontroller.addservice)
router.get("/getallservice",servicecontroller.getallservice)
router.get("/getservicebyid/:id",servicecontroller.getservicebyid)
router.put("/updateservice/:id",servicecontroller.uodateservice)
router.delete("/deleteservice/:id",servicecontroller.deleteservice)

module.exports = router