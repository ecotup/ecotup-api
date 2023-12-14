const express = require("express");
const router = express.Router();

const {
  getAllClusterController,
  getClusterByIdController,
  insertClusterController,
  updateClusterController,
  deleteClusterController,
} = require("../controller/cluster_controller");

router.get("/", getAllClusterController);
router.get("/detail", getClusterByIdController);
router.post("/register", insertClusterController);
router.put("/update/:id", updateClusterController);
router.delete("/delete/:id", deleteClusterController);
module.exports = router;
