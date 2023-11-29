const knex = require("knex");
const knexfile = require("../../knexfile");
const db = knex(knexfile.development);

const getUserSubscriptionController = async (req, res) => {
  try {
    const subscription = await db.select().from("tbl_subscription");
    res.status(200).json({
      error: false,
      message: "Request successful",
      data: subscription,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
    res.status(404).json({
      error: true,
      message: "Request not found",
    });
  }
};
const getSubscriptionByIdController = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id subscription is required",
    });
  }
  try {
    const subscription = await db
        .select()
        .from("tbl_subscription")
        .where({ subscription_id: id })
        .first();
    if (subscription) {
      res.status(200).json({
        error: false,
        message: "Request successful",
        data: subscription,
      });
    } else {
      res.status(404).json({
        error: true,
        message: "Request not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal server error",
      debug: error.message,
    });
  };
};
const insertSubscriptionController = async (req, res) => {
  const { status, value } = req.body;
  if (!status) {
    return res.status(400).json({
      error: true,
      message: "Status subscription is required",
    });
  }
  if (!value) {
    return res.status(400).json({
      error: true,
      message: "Value subscription is required",
    });
  }
  try {
    const data = {
      subscription_status: status,
      subscription_value: value,
      created_at: db.fn.now(),
    };
    const subscription = await db("tbl_subscription").insert(data);
    if (subscription) {
      res.status(200).json({
        error: false,
        message: "Register subscription successful",
      });
    } else {
      res.status(401).json({
        error: true,
        message: "Register subscription failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal server error",
      debug: error.message,
    });
  }
};
const updateSubscriptionController = async (req, res) => {
  const { id } = req.params;
  const { status, value } = req.body;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id subscription is required",
    });
  }
  if (!status) {
    return res.status(400).json({
      error: true,
      message: "Status subscription is required",
    });
  }
  if (!value) {
    return res.status(400).json({
      error: true,
      message: "Value subscription is required",
    });
  }
  try {
    const updateData = {
      subscription_status: status,
      subscription_value: value,
      updated_at: db.fn.now(),
    };
    const subscription = await db("tbl_subscription")
        .where({ subscription_id: id })
        .update(updateData);
    if (subscription) {
      res.status(200).json({
        error: false,
        message: "Update subscription successful",
      });
    } else {
      res.status(401).json({
        error: true,
        message: "Update subscription failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal server error",
      debug: error.message,
    });
  }
};
const deleteSubscriptionController = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id subscription is required",
    });
  }
  try {
    const subscription = await db("tbl_subscription")
        .where({ subscription_id: id })
        .delete();
    if (subscription) {
      res.status(200).json({
        error: false,
        message: "Delete subscription successful",
      });
    } else {
      res.status(401).json({
        error: true,
        message: "Delete subscription failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal server error",
      debug: error.message,
    });
  }
};
module.exports = {
  getUserSubscriptionController,
  getSubscriptionByIdController,
  insertSubscriptionController,
  updateSubscriptionController,
  deleteSubscriptionController,
};
