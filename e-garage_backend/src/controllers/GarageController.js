const Garage = require("../models/GarageModel");

// create garage
exports.createGarage = async (req, res) => {
  try {

    const garage = await Garage.create(req.body);

    res.status(201).json({
      message: "Garage created",
      data: garage
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all garages
exports.getGarages = async (req, res) => {
  try {

    const garages = await Garage.find()
      .populate("owner_id");

    res.json(garages);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete garage
exports.deleteGarage = async (req, res) => {
  try {

    await Garage.findByIdAndDelete(req.params.id);

    res.json({
      message: "Garage deleted"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};