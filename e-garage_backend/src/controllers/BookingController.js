const Booking = require("../models/BookingModel");

// create booking
exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    res.status(201).json({
      message: "Booking created successfully",
      data: booking
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user_id")
      .populate("garage_id")
      .populate("service_id");

    res.json(bookings);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get booking by id
exports.getBookingById = async (req, res) => {
  try {

    const booking = await Booking.findById(req.params.id);

    res.json(booking);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update booking
exports.updateBooking = async (req, res) => {
  try {

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(booking);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete booking
exports.deleteBooking = async (req, res) => {
  try {

    await Booking.findByIdAndDelete(req.params.id);

    res.json({
      message: "Booking deleted"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};