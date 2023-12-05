const knex = require("knex");
const knexfile = require("../knexfile");
const db = knex(knexfile.development);

const getAllArticleController = async (req, res) => {
  try {
    const articles = await db.select().from("tbl_article");
    if (articles) {
      return res.status(200).json({
        error: false,
        message: "Request successful",
        data: articles,
      });
    } else {
      return res.status(404).json({
        error: true,
        message: "Request not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};
const getArticleByIdController = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id article is required",
    });
  }
  try {
    const article = await db
        .select()
        .from("tbl_article")
        .where({ article_id: id })
        .first();
    if (article) {
      return res.status(200).json({
        error: false,
        message: "Request successful",
        data: article,
      });
    } else {
      return res.status(404).json({
        error: true,
        message: "Request not found",
      });
    }
  } catch (error) {
    return resstatus(500).json({
      error: true,
      message: "Internal server error",
      debug: error.message,
    });
  }
};
const insertArticleController = async (req, res) => {
  const { name, image, author, link, date } = req.body;
  if (!name) {
    return res.status(400).json({
      error: true,
      message: "Name article is required",
    });
  }
  if (!link) {
    return res.status(400).json({
      error: true,
      message: "Link article is required",
    });
  }
  if (!author) {
    return res.status(400).json({
      error: true,
      message: "Author article is required",
    });
  }
  try {
    const data = {
      article_name: name,
      article_image: image,
      article_link: link,
      article_author: author,
      article_date: date,
      created_at: db.fn.now(),
    };
    const article = await db("tbl_article").insert(data);
    if (article) {
      return res.status(200).json({
        error: false,
        message: "Register article successful",
      });
    } else {
      return res.status(401).json({
        error: true,
        message: "Register article failed",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
      debug: error.message,
    });
  }
};
const updateArticleController = async (req, res) => {
  const { id } = req.params;
  const { name, image, author, link, date } = req.body;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id article is required",
    });
  }
  try {
    const updateData = {
      article_name: name,
      article_image: image,
      article_link: link,
      article_author: author,
      article_date: date,
      updated_at: db.fn.now(),
    };
    const article = await db("tbl_article")
        .where({ article_id: id })
        .update(updateData);
    if (article) {
      return res.status(200).json({
        error: false,
        message: "Update article successful",
      });
    } else {
      return res.status(401).json({
        error: true,
        message: "Update article failed",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
      debug: error.message,
    });
  }
};
const deleteArticleController = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id article is required",
    });
  }
  try {
    const article = await db("tbl_article").where({ article_id: id }).delete();
    if (article) {
      return res.status(200).json({
        error: false,
        message: "Delete article successful",
      });
    } else {
      return res.status(401).json({
        error: true,
        message: "Delete article failed",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
      debug: error.message,
    });
  }
};
module.exports = {
  getAllArticleController,
  getArticleByIdController,
  insertArticleController,
  updateArticleController,
  deleteArticleController,
};
