const express = require("express");
const router = express.Router();
const ImageUpload = require("../modules/imageUpload");
const Multer = require("multer");
const multer = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024,
});
const {
  getAllDriverController,
  getDriverByIdController,
  logInDriverController,
  signInDriverController,
  updateDriverController,
  updatedriverProfileController,
  updatedriverPointController,
  updatedriverRatingController,
  updateDriverPasswordController,
  deleteDriverController,
} = require("../controller/driver_controller");

router.get("/", getAllDriverController);
router.get("/detail/:id", getDriverByIdController);
router.post("/login", logInDriverController);
router.post("/register", signInDriverController);
router.put("/update/:id", updateDriverController);
router.post("/update/profile/:id", multer.single("attachment"), ImageUpload.uploadToGcs, updatedriverProfileController);
router.post("/update/point/:id", updatedriverPointController);
router.post("/update/rating/:id", updatedriverRatingController);
router.post("/update/password/:id", updateDriverPasswordController);
router.delete("/delete/:id", deleteDriverController);

module.exports = router;
