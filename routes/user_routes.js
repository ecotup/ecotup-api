const express = require("express");
const router = express.Router();
const upload = require("../config/multer_config");

const {
  getAllUserController,
  getUserByIdController,
  logInUserController,
  logInWithGoogleUserController,
  signInUserController,
  signInWithGoogleUserController,
  updateUserController,
  updateUserPointController,
  updateUserPasswordController,
  updateUserSubscriptionController,
  uploadUserController,
  deleteUserController,
} = require("../controller/user_controller");

router.get("/", getAllUserController);
router.get("/detail/:id", getUserByIdController);
router.post("/login", logInUserController);
router.post("/login/google", logInWithGoogleUserController);
router.post("/register", signInUserController);
router.post("/register/google", signInWithGoogleUserController);
router.put("/update/:id", updateUserController);
router.post("/update/point/:id", updateUserPointController);
router.post("/update/password/:id", updateUserPasswordController);
router.post("/update/subscription/:id", updateUserSubscriptionController);
router.post("/upload/:id", upload.single('image'), uploadUserController);
router.delete("/delete/:id", deleteUserController);

module.exports = router;
