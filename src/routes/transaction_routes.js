const express = require("express");
const router = express.Router();

const {
  getAllTransactionController,
  getTransactionByIdController,
  insertTransactionController,
  updateTransactionController,
  deleteTransactionController,
} = require("../controller/transaction_controller");

router.get("/", getAllTransactionController);
router.get("/detail/:id", getTransactionByIdController);
router.post("/register", insertTransactionController);
router.post("/update/:id", updateTransactionController);
router.delete("/delete/:id", deleteTransactionController);
module.exports = router;
