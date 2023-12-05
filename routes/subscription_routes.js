const express = require("express");
const router = express.Router();

const {
  getUserSubscriptionController,
  getSubscriptionByIdController,
  insertSubscriptionController,
  updateSubscriptionController,
  deleteSubscriptionController,
} = require("../controller/subscription_controller");

router.get("/", getUserSubscriptionController);
router.get("/detail/:id", getSubscriptionByIdController);
router.post("/register", insertSubscriptionController);
router.put("/update/:id", updateSubscriptionController);
router.delete("/delete/:id", deleteSubscriptionController);
module.exports = router;
