const router = require("express").Router()
const planController = require("../controllers/SubscriptionPlanController")

router.post("/plan", planController.createPlan)

router.get("/plan", planController.getPlans)

router.put("/plan/:id", planController.updatePlan)

router.delete("/plan/:id", planController.deletePlan)

module.exports = router