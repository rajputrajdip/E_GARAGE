const mongoose = require("mongoose");

const garageOwnerSchema = new mongoose.Schema(
  {
    garageName: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    ownername: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GarageOwner", garageOwnerSchema);