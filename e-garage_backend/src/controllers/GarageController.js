const Garage = require("../models/GarageModel");

// CREATE
// CREATE GARAGE
exports.createGarage = async (req, res) => {
  try {
    console.log("BODY 👉", req.body);
    console.log("FILE 👉", req.file);
    console.log("USER 👉", req.user);
    

    const garage = new Garage({
      garageName: req.body?.garageName || "",
      city: req.body?.city || "",
      image: req.file ? req.file.path : "",
      garageOwnerId: req.user.id || req.user._id, // ✅ FIX (supports both)
    });

    await garage.save();

    res.status(201).json(garage);
  } catch (error) {
    console.error("CREATE GARAGE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
  exports.getAllGarages = async (req, res) => {
  try {
    const garages = await Garage.find().populate(
      "garageOwnerId",
      "firstName lastName"
    );

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
