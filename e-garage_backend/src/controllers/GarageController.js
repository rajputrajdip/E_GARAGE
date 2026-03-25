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

// ✅ APPROVE / REJECT GARAGE
exports.updateGarageStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const garage = await Garage.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({ message: "Garage status updated", garage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
