const express = require("express");
const router = express.Router();

const {
  getAllArticleController,
  getArticleByIdController,
  insertArticleController,
  updateArticleController,
  deleteArticleController,
} = require("../controller/article_controller");

router.get("/", getAllArticleController);
router.get("/detail/:id", getArticleByIdController);
router.post("/register", insertArticleController);
router.put("/update/:id", updateArticleController);
router.delete("/delete/:id", deleteArticleController);

module.exports = router;
