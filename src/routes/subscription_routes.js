const express = require("express");
const router = express.Router();

const {
  getUserSubscriptionController,
} = require("../controller/subscription_controller");

router.get("/", getUserSubscriptionController);
module.exports = router;
