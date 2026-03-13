const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  garage_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Garage"
  },
  rating: {
    type: Number
  },
  comment: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Review", reviewSchema);