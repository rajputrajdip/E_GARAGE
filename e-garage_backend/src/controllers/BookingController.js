// controllers/BookingController.js
const Booking = require("../models/BookingModel");
const Service = require("../models/ServiceModel");
const mongoose = require("mongoose");

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const { userId, serviceId, serviceName, price, bookingDate } = req.body;

    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: "Service not found" });

    const booking = await Booking.create({
      userId: mongoose.Types.ObjectId(userId),
      serviceId: mongoose.Types.ObjectId(serviceId),
      garageId: service.garageId,
      serviceName,
      price,
      bookingDate
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("Booking creation error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get bookings by user
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate("userId", "firstName lastName email role")
      .populate("garageId", "garageName city")
      .populate("serviceId", "serviceName price");

    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching user bookings:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "firstName lastName email role")
      .populate("garageId", "garageName city")
      .populate("serviceId", "serviceName price");

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("userId", "firstName lastName email role")
      .populate("garageId", "garageName city")
      .populate("serviceId", "serviceName price");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json(booking);
  } catch (err) {
    console.error("Error fetching booking:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};