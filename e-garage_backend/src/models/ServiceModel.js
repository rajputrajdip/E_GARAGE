const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  garage_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Garage"
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceCategory"
  },
  service_name: {
    type: String,
    required: true
  },
  price: {
    type: Number
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model("Service", serviceSchema);