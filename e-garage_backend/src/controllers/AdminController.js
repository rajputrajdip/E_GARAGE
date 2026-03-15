const User = require("../models/Usermodels");
const Garage = require("../models/GarageModel");

// get all users
exports.getUsers = async (req, res) => {
  try {

    const users = await User.find();

    res.json(users);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all garages
exports.getGarages = async (req, res) => {
  try {

    const garages = await Garage.find();

    res.json(garages);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete user
exports.deleteUser = async (req, res) => {
  try {

    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "User deleted"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};