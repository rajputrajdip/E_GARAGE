const mongoose = require("mongoose");

const garageSchema = new mongoose.Schema({
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GarageOwner"
  },
  garage_name: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  pincode: {
    type: String
  },
  contact: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Garage", garageSchema);