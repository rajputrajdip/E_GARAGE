const Garage = require("../models/GarageModel");

// CREATE
exports.createGarage = async (req, res) => {
  try {
    const garage = await Garage.create(req.body);
    res.status(201).json(garage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
exports.getAllGarages = async (req, res) => {
  try {
    const garages = await Garage.find();
    res.status(200).json(garages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET BY ID
exports.getGarageById = async (req, res) => {
  try {
    const garage = await Garage.findById(req.params.id);
    res.status(200).json(garage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};