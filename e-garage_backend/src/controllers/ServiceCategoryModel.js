const ServiceCategory = require("../models/ServiceCategoryModel");

// Create Category
exports.createCategory = async (req, res) => {
  try {
    const category = await ServiceCategory.create(req.body);

    res.status(201).json({
      message: "Category created successfully",
      data: category
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Categories
exports.getCategories = async (req, res) => {
  try {

    const categories = await ServiceCategory.find();

    res.json(categories);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Category
exports.updateCategory = async (req, res) => {
  try {

    const category = await ServiceCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(category);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
  try {

    await ServiceCategory.findByIdAndDelete(req.params.id);

    res.json({
      message: "Category deleted"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};