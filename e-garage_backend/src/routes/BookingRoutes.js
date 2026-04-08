// routes/BookingRoutes.js
const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/BookingController");

// Create booking
router.post("/create", bookingController.createBooking);

// Get bookings by user
router.get("/user/:userId", bookingController.getUserBookings);

// Get all bookings (admin)
router.get("/all", bookingController.getAllBookings);

// Get booking by ID
router.get("/:id", bookingController.getBookingById);

router.put("/status/:id", bookingController.updateBookingStatus);
router.post("/create-order", bookingController.createOrder);
router.post("/verify-payment", bookingController.verifyPayment);

module.exports = router;