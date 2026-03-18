const User = require("../models/Usermodels");
const Garage = require("../models/GarageModel");

// get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all garages
const getGarages = async (req, res) => {
  try {
    const garages = await Garage.find();
    res.json(garages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
    res.json(payments)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// ✅ EXPORT PROPERLY
module.exports = {
  getUsers,
  getGarages,
  deleteUser,
  getBookings,
  getPayments
};