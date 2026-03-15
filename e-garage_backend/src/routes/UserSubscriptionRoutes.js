const router = require("express").Router()
const subscriptionController = require("../controllers/UserSubscriptionController")

router.post("/subscription", subscriptionController.createSubscription)

router.get("/subscription", subscriptionController.getSubscriptions)

router.delete("/subscription/:id", subscriptionController.deleteSubscription)

module.exports = router