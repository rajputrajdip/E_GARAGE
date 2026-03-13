const mongoose = require("mongoose");

const userSubscriptionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  plan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubscriptionPlan"
  },
  start_date: {
    type: Date
  },
  end_date: {
    type: Date
  },
  status: {
    type: String,
    default: "Active"
  }
});

module.exports = mongoose.model("UserSubscription", userSubscriptionSchema);