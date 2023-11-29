const express = require("express");
const router = express.Router();

const {
  getAllDriverController,
  getDriverByIdController,
  logInDriverController,
  signInDriverController,
  updateDriverController,
  updatedriverProfileController,
  updatedriverPointController,
  updateDriverPasswordController,
  deleteDriverController,
} = require("../controller/driver_controller");

router.get("/", getAllDriverController);
router.get("/detail/:id", getDriverByIdController);
router.post("/login", logInDriverController);
router.post("/register", signInDriverController);
router.post("/update/:id", updateDriverController);
router.post("/update/profile/:id", updatedriverProfileController);
router.post("/update/point/:id", updatedriverPointController);
router.post("/update/password/:id", updateDriverPasswordController);
router.delete("/delete/:id", deleteDriverController);

module.exports = router;
