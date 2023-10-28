const express = require("express");
const router = express.Router();

const {
  getHistoryByIdController,
} = require("../controller/history_controller");

router.get("/detail/:id", getHistoryByIdController);
module.exports = router;
