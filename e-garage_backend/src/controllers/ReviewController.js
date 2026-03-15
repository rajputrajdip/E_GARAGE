const Review = require("../models/ReviewModel");

exports.addReview = async (req, res) => {
  try {

    const review = await Review.create(req.body);

    res.status(201).json({
      message: "Review added",
      data: review
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviews = async (req, res) => {
  try {

    const reviews = await Review.find()
      .populate("user_id")
      .populate("garage_id");

    res.json(reviews);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {

    await Review.findByIdAndDelete(req.params.id);

    res.json({
      message: "Review deleted"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};