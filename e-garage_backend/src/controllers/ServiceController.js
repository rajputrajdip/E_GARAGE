const Service = require("../models/ServiceModel");

// CREATE SERVICE
exports.createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SERVICES BY GARAGE
exports.getServiceByGarage = async (req, res) => {
  try {
    const services = await Service.find({ garageId: req.params.garageId });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};