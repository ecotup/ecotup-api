const express = require("express");
const router = express.Router();
const upload = require("../config/multer_config");

const {
  getAllDriverController,
  getDriverByIdController,
  logInDriverController,
  logInWithGoogleDriverController,
  signInDriverController,
  signInWithGoogleDriverController,
  updateDriverController,
  updateDriverPointController,
  updateDriverRatingController,
  updateDriverPasswordController,
  uploadDriverController,
  deleteDriverController,
} = require("../controller/driver_controller");

router.get("/", getAllDriverController);
router.get("/detail/:id", getDriverByIdController);
router.post("/login", logInDriverController);
router.post("/login/google", logInWithGoogleDriverController);
router.post("/register", signInDriverController);
router.post("/register/google", signInWithGoogleDriverController);
router.put("/update/:id", updateDriverController);
router.post("/update/point/:id", updateDriverPointController);
router.post("/update/rating/:id", updateDriverRatingController);
router.post("/update/password/:id", updateDriverPasswordController);
router.post("/upload/:id", upload.single("image"), uploadDriverController);
router.delete("/delete/:id", deleteDriverController);

module.exports = router;
