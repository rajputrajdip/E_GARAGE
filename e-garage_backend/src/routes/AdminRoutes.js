const router = require("express").Router()
const adminController = require("../controllers/AdminController")

router.get("/users", adminController.getUsers)

router.delete("/user/:id", adminController.deleteUser)

router.get("/garages", adminController.getGarages)

router.get("/bookings", adminController.getBookings)

router.get("/payments", adminController.getPayments)

module.exports = router