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

//add service
exports.addService = async (req, res) => {
  try {
    const { serviceName, price, garageId } = req.body;

    const service = await Service.create({
      serviceName,
      price,
      garageId,
    });

    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};