const express = require("express");
const router = express.Router();

const {
  getAllUserController,
  getUserByIdController,
  logInUserController,
  signInUserController,
  updateUserController,
  updateUserProfileController,
  updateUserPointController,
  updateUserPasswordController,
  // updateUserSubscriptionController,
  deleteUserController,
} = require("../controller/user_controller");

router.get("/", getAllUserController);
router.get("/detail/:id", getUserByIdController);
router.post("/login", logInUserController);
router.post("/register", signInUserController);
router.post("/update/:id", updateUserController);
router.post("/update/profile/:id", updateUserProfileController);
router.post("/update/point/:id", updateUserPointController);
router.post("/update/password/:id", updateUserPasswordController);
// router.post("/update/subscription/:id", updateUserSubscriptionController);
router.delete("/delete/:id", deleteUserController);

module.exports = router;
