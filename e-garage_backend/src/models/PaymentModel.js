const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  booking_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking"
  },
  amount: {
    type: Number
  },
  payment_method: {
    type: String
  },
  payment_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Payment", paymentSchema);