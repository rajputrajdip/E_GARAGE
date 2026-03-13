const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  garage_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Garage"
  },
  plan_name: {
    type: String
  },
  price: {
    type: Number
  },
  duration: {
    type: Number
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model("SubscriptionPlan", planSchema);