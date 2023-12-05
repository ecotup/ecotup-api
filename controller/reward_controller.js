const knex = require("knex");
const knexfile = require("../knexfile");
const db = knex(knexfile.development);

const getAllRewardController = async (req, res) => {
  try {
    const rewards = await db.select().from("tbl_reward");
    if (rewards) {
      return res.status(200).json({
        error: false,
        message: "Request successful",
        data: rewards,
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
const getRewardByIdController = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id reward is required",
    });
  }
  try {
    const reward = await db
        .select()
        .from("tbl_reward")
        .where({ reward_id: id })
        .first();
    if (reward) {
      return res.status(200).json({
        error: false,
        message: "Request successful",
        data: reward,
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
      debug: error.message,
    });
  }
};
const insertRewardController = async (req, res) => {
  const { name, image, price, description } = req.body;
  if (!name) {
    return res.status(400).json({
      error: true,
      message: "Name reward is required",
    });
  }
  if (!image) {
    return res.status(400).json({
      error: true,
      message: "Image reward is required",
    });
  }
  if (!price) {
    return res.status(400).json({
      error: true,
      message: "Price reward is required",
    });
  }
  if (!description) {
    return res.status(400).json({
      error: true,
      message: "Description reward is required",
    });
  }
  try {
    const data = {
      reward_image: image,
      reward_name: name,
      reward_price: price,
      reward_description: description,
      created_at: db.fn.now(),
    };
    const reward = await db("tbl_reward").insert(data);
    if (reward) {
      return res.status(200).json({
        error: false,
        message: "Register reward successful",
      });
    } else {
      return res.status(401).json({
        error: true,
        message: "Register reward failed",
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
const updateRewardController = async (req, res) => {
  const { id } = req.params;
  const { name, image, price, description } = req.body;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id reward is required",
    });
  }
  try {
    const updateData = {
      reward_name: name,
      reward_image: image,
      reward_price: price,
      reward_description: description,
      updated_at: db.fn.now(),
    };
    const reward = await db("tbl_reward")
        .where({ reward_id: id })
        .update(updateData);
    if (reward) {
      return res.status(200).json({
        error: false,
        message: "Update reward successful",
      });
    } else {
      return res.status(401).json({
        error: true,
        message: "Update reward failed",
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
const deleteRewardController = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id reward is required",
    });
  }
  try {
    const reward = await db("tbl_reward").where({ reward_id: id }).delete();
    if (reward) {
      return res.status(200).json({
        error: false,
        message: "Delete reward successful",
      });
    } else {
      return res.status(401).json({
        error: true,
        message: "Delete reward failed",
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
  getAllRewardController,
  getRewardByIdController,
  insertRewardController,
  updateRewardController,
  deleteRewardController,
};
