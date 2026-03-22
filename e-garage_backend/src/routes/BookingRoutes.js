const router = require("express").Router();
const bookingController = require("../controllers/BookingController");

// CREATE BOOKING
router.post("/create", bookingController.createBooking);

// GET BOOKINGS BY USER
router.get("/user/:userId", bookingController.getUserBookings);

// GET ALL BOOKINGS
router.get("/all", bookingController.getAllBookings);

module.exports = router;