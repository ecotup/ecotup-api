const express = require("express");
const router = express.Router();

const {
  getAllTransactionController,
  getTransactionByIdController,
  insertTransactionController,
  updateTransactionController,
  updateTransactionStatusController,
  deleteTransactionController,
} = require("../controller/transaction_controller");

router.get("/", getAllTransactionController);
router.get("/detail/:id", getTransactionByIdController);
router.post("/register", insertTransactionController);
router.put("/update/:id", updateTransactionController);
router.post("/update/status/:id", updateTransactionStatusController);
router.delete("/delete/:id", deleteTransactionController);
module.exports = router;
