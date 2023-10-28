const express = require("express");
const router = express.Router();

const {
  getAllUserController,
  getUserByIdController,
  logInController,
  signInController,
  updateUserController,
  updateUserPasswordController,
  updateUserRolesController,
  deleteUserController,
} = require("../controller/user_controller");

router.get("/", getAllUserController);
router.get("/detail/:id", getUserByIdController);
router.post("/auth", logInController);
router.post("/register", signInController);
router.post("/update/:id", updateUserController);
router.post("/update/password/:id", updateUserPasswordController);
router.post("/update/roles/:id", updateUserRolesController);
router.delete("/delete/:id", deleteUserController);

module.exports = router;
