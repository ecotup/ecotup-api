const express = require("express");
const router = express.Router();

const {
  getAllRewardController,
  getRewardByIdController,
  insertRewardController,
  updateRewardController,
  deleteRewardController,
} = require("../controller/reward_controller");

router.get("/", getAllRewardController);
router.get("/detail/:id", getRewardByIdController);
router.post("/register", insertRewardController);
router.post("/update/:id", updateRewardController);
router.delete("/delete/:id", deleteRewardController);

module.exports = router;
