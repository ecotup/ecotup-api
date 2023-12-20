const express = require("express");
const router = express.Router();

const {
  getDirectionTransactionController,
  getAllTransactionController,
  getTransactionLocationDriverController,
  getTransactionByIdController,
  getTransactionController,
  getTransactionSubscriptionController,
  getTransactionDriverOnGoingController,
  insertTransactionController,
  updateTransactionController,
  updateTransactionStatusController,
  updateTransactionLocationDriverController,
  deleteTransactionController,
} = require("../controller/transaction_controller");


router.get("/", getAllTransactionController);
router.get("/direction/:id", getDirectionTransactionController);
router.get("/detail/:id", getTransactionByIdController);
router.post("/detail", getTransactionController);
router.post("/detail/subscription", getTransactionSubscriptionController);
router.get("/driver/status/:id", getTransactionDriverOnGoingController);
router.post("/location/driver", getTransactionLocationDriverController);
router.post("/register", insertTransactionController);
router.put("/update/:id", updateTransactionController);
router.post("/update/status/:id", updateTransactionStatusController);
router.post("/update/location/driver/:id", updateTransactionLocationDriverController),
router.delete("/delete/:id", deleteTransactionController);
module.exports = router;
