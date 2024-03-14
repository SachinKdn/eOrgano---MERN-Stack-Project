const express = require("express");
const { isAuthenticatedUser } = require("../middlewares/auth");
const { processPayment, sendStripeApiKey } = require("../controllers/paymentController.js");
const router = express.Router();


router.route("/payment/process").post(isAuthenticatedUser,processPayment);
router.route("/stripeapikey").get(sendStripeApiKey);

module.exports = router;