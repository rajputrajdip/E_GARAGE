const Payment = require("../models/PaymentModel");

exports.createPayment = async (req, res) => {
  try {

    const payment = await Payment.create(req.body);

    res.status(201).json({
      message: "Payment successful",
      data: payment
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPayments = async (req, res) => {
  try {

    const payments = await Payment.find()
      .populate("booking_id");

    res.json(payments);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};