const Garage = require("../models/GarageModel");
const Booking = require("../models/BookingModel");
const mongoose = require("mongoose");

// Get garages owned by the logged-in owner
exports.getMyGarages = async (req, res) => {
  try {
    const garages = await Garage.find({ garageOwnerId: req.user.id });
    res.status(200).json(garages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new garage
exports.createGarage = async (req, res) => {
  try {
    const { garageName, city, address, image } = req.body;

    if (!garageName) {
      return res.status(400).json({ message: "Garage name is required" });
    }

    const newGarage = await Garage.create({
      garageName,
      city,
      address,
      image,
      garageOwnerId: req.user.id,
    });

    res.status(201).json(newGarage);
  } catch (err) {
    console.error("CREATE GARAGE ERROR:", err.message);
    res.status(500).json({ message: "Failed to create garage", error: err.message });
  }
};

// Update garage
exports.updateGarage = async (req, res) => {
  try {
    const garage = await Garage.findOneAndUpdate(
      { _id: req.params.id, garageOwnerId: req.user.id },
      req.body,
      { new: true }
    );
    if (!garage) return res.status(404).json({ message: "Garage not found" });
    res.status(200).json(garage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete garage
exports.deleteGarage = async (req, res) => {
  try {
    const garage = await Garage.findOneAndDelete({
      _id: req.params.id,
      garageOwnerId: req.user.id,
    });
    if (!garage) return res.status(404).json({ message: "Garage not found" });
    res.status(200).json({ message: "Garage deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get bookings for owner's garages
exports.getMyBookings = async (req, res) => {
  try {
    const garages = await Garage.find({ garageOwnerId: req.user.id });
    const garageIds = garages.map((g) => g._id);

    const bookings = await Booking.find({ garageId: { $in: garageIds } })
      .populate("userId", "firstName lastName email")
      .populate("serviceId", "serviceName price")
      .populate("garageId", "garageName city");

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};