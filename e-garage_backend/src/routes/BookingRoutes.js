const router = require("express").Router()
const bookingController = require("../controllers/BookingController")

router.post("/booking", bookingController.createBooking)

router.get("/booking", bookingController.getAllBookings)

router.get("/booking/:id", bookingController.getBookingById)

router.put("/booking/:id", bookingController.updateBooking)

router.delete("/booking/:id", bookingController.deleteBooking)

module.exports = router