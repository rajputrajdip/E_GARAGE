const router = require("express").Router()
const usercontroller = require("../controllers/usercontrollers")
router.post("/register",usercontroller.registeruser)
router.post("/login",usercontroller.loginUser)
module.exports = router