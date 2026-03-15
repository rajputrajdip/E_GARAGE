const UserSubscription = require("../models/UserSubscriptionModel");

// Create Subscription
exports.createSubscription = async (req, res) => {
  try {

    const subscription = await UserSubscription.create(req.body);

    res.status(201).json({
      message: "Subscription created",
      data: subscription
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Subscriptions
exports.getSubscriptions = async (req, res) => {
  try {

    const subscriptions = await UserSubscription.find()
      .populate("user_id")
      .populate("plan_id");

    res.json(subscriptions);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Subscription
exports.deleteSubscription = async (req, res) => {
  try {

    await UserSubscription.findByIdAndDelete(req.params.id);

    res.json({
      message: "Subscription deleted"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};