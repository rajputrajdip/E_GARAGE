const SubscriptionPlan = require("../models/SubscriptionPlanModel");

// Create Plan
exports.createPlan = async (req, res) => {
  try {

    const plan = await SubscriptionPlan.create(req.body);

    res.status(201).json({
      message: "Plan created",
      data: plan
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Plans
exports.getPlans = async (req, res) => {
  try {

    const plans = await SubscriptionPlan.find();

    res.json(plans);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Plan
exports.updatePlan = async (req, res) => {
  try {

    const plan = await SubscriptionPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(plan);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Plan
exports.deletePlan = async (req, res) => {
  try {

    await SubscriptionPlan.findByIdAndDelete(req.params.id);

    res.json({
      message: "Plan deleted"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};