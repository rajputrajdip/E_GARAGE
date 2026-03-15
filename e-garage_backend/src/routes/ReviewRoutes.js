const router = require("express").Router()
const reviewController = require("../controllers/ReviewController")

router.post("/review", reviewController.addReview)

router.get("/review", reviewController.getReviews)

router.delete("/review/:id", reviewController.deleteReview)

module.exports = router