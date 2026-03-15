const router = require("express").Router()
const paymentController = require("../controllers/PaymentController")

router.post("/payment", paymentController.createPayment)

router.get("/payment", paymentController.getPayments)

module.exports = router