const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  garage_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Garage"
  },
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service"
  },
  booking_date: {
    type: Date
  },
  status: {
    type: String,
    default: "Pending"
  }
});

module.exports = mongoose.model("Booking", bookingSchema);