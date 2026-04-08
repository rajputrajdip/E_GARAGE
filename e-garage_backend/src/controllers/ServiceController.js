// const Service = require("../models/ServiceModel");

// // CREATE SERVICE
// exports.createService = async (req, res) => {
//   try {
//     const {
//       serviceName,
//       description,
//       priceTwoWheeler,
//       priceFourWheeler,
//       garageId,
//     } = req.body;

//     const service = new Service({
//       serviceName,
//       description,
//       priceTwoWheeler,
//       priceFourWheeler,
//       garageId,
//     });

//     await service.save();

//     res.status(201).json(service);
//   } catch (err) {
//     console.log("ERROR 👉", err);
//     res.status(500).json({ message: "Failed to create service" });
//   }
// };

// // GET SERVICES BY GARAGE
// exports.getServiceByGarage = async (req, res) => {
//   try {
//     const services = await Service.find({ garageId: req.params.garageId });
//     res.json(services);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// // GET ALL SERVICES
// exports.getAllServices = async (req, res) => {
//   try {
//     const services = await Service.find().populate("garageId", "garageName");

//     res.status(200).json(services);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// //add service
// exports.addService = async (req, res) => {
//   try {
//     const { serviceName, price, garageId } = req.body;

//     const service = await Service.create({
//       serviceName,
//       price,
//       garageId,
//     });

//     res.status(201).json(service);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };






const Service = require("../models/ServiceModel");

// CREATE SERVICE
exports.createService = async (req, res) => {
  try {
    const {
      serviceName,
      description,
      priceTwoWheeler,
      priceFourWheeler,
      garageId,
    } = req.body;

    const service = new Service({
      serviceName,
      description,
      priceTwoWheeler,
      priceFourWheeler,
      garageId,
    });

    await service.save();

    res.status(201).json(service);
  } catch (err) {
    console.log("ERROR 👉", err);
    res.status(500).json({ message: "Failed to create service" });
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

// GET ALL SERVICES
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate("garageId", "garageName");

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ FIXED ADD SERVICE (MAIN ISSUE)
exports.addService = async (req, res) => {
  try {
    console.log("BODY 👉", req.body); // DEBUG

    const {
      serviceName,
      description,
      priceTwoWheeler,
      priceFourWheeler,
      garageId,
    } = req.body;

    // ✅ validation (prevents 500 error)
    if (!serviceName || !garageId) {
      return res.status(400).json({ message: "Service name & garageId required" });
    }

    if (!priceTwoWheeler || !priceFourWheeler) {
      return res.status(400).json({
        message: "Both prices required (2W & 4W)",
      });
    }

    const service = await Service.create({
      serviceName,
      description: description || "",
      priceTwoWheeler: Number(priceTwoWheeler),
      priceFourWheeler: Number(priceFourWheeler),
      garageId,
    });

    res.status(201).json(service);

  } catch (err) {
    console.log("ERROR 👉", err);
    res.status(500).json({ message: err.message });
  }
};