const express = require("express");
const router = express.Router();

const {
  getTransactionByIdController,
} = require("../controller/transaction_controller");

router.get("/detail/:id", getTransactionByIdController);
module.exports = router;
