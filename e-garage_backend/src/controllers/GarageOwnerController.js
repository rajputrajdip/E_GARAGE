const GarageOwner = require("../models/GarageOwner");

// REGISTER
const registerGarageOwner = async (req, res) => {

  try {

    const newOwner = new GarageOwner({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      document: req.body.document
    });

    const savedOwner = await newOwner.save();

    res.status(201).json({
      message: "Garage Owner Registered Successfully",
      data: savedOwner
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// LOGIN
const loginGarageOwner = async (req, res) => {

  try {

    const owner = await GarageOwner.findOne({
      email: req.body.email
    });

    if (!owner) {
      return res.status(404).json({
        message: "Garage Owner not found"
      });
    }

    if (owner.password !== req.body.password) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    res.status(200).json({
      message: "Login successful",
      data: owner
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// GET ALL
const getAllGarageOwner = async (req, res) => {

  try {

    const owners = await GarageOwner.find();

    res.status(200).json({
      data: owners
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// GET BY ID
const getGarageOwnerById = async (req, res) => {

  try {

    const owner = await GarageOwner.findById(req.params.id);

    res.status(200).json({
      data: owner
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// UPDATE
const updateGarageOwner = async (req, res) => {

  try {

    const updatedOwner = await GarageOwner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Garage Owner Updated",
      data: updatedOwner
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// DELETE
const deleteGarageOwner = async (req, res) => {

  try {

    await GarageOwner.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Garage Owner Deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  registerGarageOwner,
  loginGarageOwner,
  getAllGarageOwner,
  getGarageOwnerById,
  updateGarageOwner,
  deleteGarageOwner
};