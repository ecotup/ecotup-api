const express = require("express");
const router = express.Router();
const ImageUpload = require("../modules/imageUpload");
const Multer = require("multer");
const multer = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024,
});
const {
  getAllUserController,
  getUserByIdController,
  logInUserController,
  signInUserController,
  updateUserController,
  updateUserPointController,
  updateUserPasswordController,
  updateUserSubscriptionController,
  deleteUserController,
} = require("../controller/user_controller");

router.get("/", getAllUserController);
router.get("/detail/:id", getUserByIdController);
router.post("/login", logInUserController);
router.post("/register", signInUserController);
router.put("/update/:id", updateUserController);
router.post("/update/point/:id", updateUserPointController);
router.post("/update/password/:id", updateUserPasswordController);
router.post("/update/subscription/:id", updateUserSubscriptionController);
router.delete("/delete/:id", deleteUserController);

module.exports = router;
