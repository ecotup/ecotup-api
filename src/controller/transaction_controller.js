const knex = require("knex");
const knexfile = require("../../knexfile");
const db = knex(knexfile.development);

const getAllTransactionController = async (req, res) => {
  try {
    const transactions = await db.select().from("tbl_transaction");
    res.status(200).json({
      error: false,
      message: "Request successful",
      data: transactions,
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

const getTransactionByIdController = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id transaction is required",
    });
  }
  try {
    const transaction = await db
        .select()
        .from("tbl_transaction")
        .where({ user_id: id })
        .first();
    if (transaction) {
      res.status(200).json({
        error: false,
        message: "Request successful",
        data: transaction,
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
  }
};
const insertTransactionController = async (req, res) => {
  const { longitude_start, latitude_start, longitude_destination, latitude_destination, total_payment, total_weight, total_point } = req.body;
  if (!longitude_start) {
    return res.status(400).json({
      error: true,
      message: "longitude start transaction is required",
    });
  }
  if (!latitude_start) {
    return res.status(400).json({
      error: true,
      message: "latitude start transaction is required",
    });
  }
  if (!longitude_destination) {
    return res.status(400).json({
      error: true,
      message: "longitude destination transaction is required",
    });
  }
  if (!latitude_destination) {
    return res.status(400).json({
      error: true,
      message: "latitude destination transaction is required",
    });
  }
  if (!total_payment) {
    return res.status(400).json({
      error: true,
      message: "total payment transaction is required",
    });
  }
  if (!total_weight) {
    return res.status(400).json({
      error: true,
      message: "total weight transaction is required",
    });
  }
  if (!total_point) {
    return res.status(400).json({
      error: true,
      message: "total point transaction is required",
    });
  }
  try {
    const data = {
      transaction_longitude_start: longitude_start,
      transaction_latitude_start: latitude_start,
      transaction_longitude_destination: longitude_destination,
      transaction_latitude_destinantion: latitude_destination,
      transaction_total_payment: total_payment,
      transaction_total_weight: total_weight,
      transaction_total_point: total_point,
      created_at: db.fn.now(),
    };
    const transaction = await db("tbl_transaction").insert(data);
    if (transaction) {
      res.status(200).json({
        error: false,
        message: "Register transaction successful",
      });
    } else {
      res.status(401).json({
        error: true,
        message: "Register transaction failed",
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
const updateTransactionController = async (req, res) => {
  const { id } = req.params;
  const {
    longitude_start,
    latitude_start,
    longitude_destination,
    latitude_destination,
    total_payment,
    total_weight,
    total_point,
  } = req.body;
  if (!longitude_start) {
    return res.status(400).json({
      error: true,
      message: "longitude start transaction is required",
    });
  }
  if (!latitude_start) {
    return res.status(400).json({
      error: true,
      message: "latitude start transaction is required",
    });
  }
  if (!longitude_destination) {
    return res.status(400).json({
      error: true,
      message: "longitude destination transaction is required",
    });
  }
  if (!latitude_destination) {
    return res.status(400).json({
      error: true,
      message: "latitude destination transaction is required",
    });
  }
  if (!total_payment) {
    return res.status(400).json({
      error: true,
      message: "total payment transaction is required",
    });
  }
  if (!total_weight) {
    return res.status(400).json({
      error: true,
      message: "total weight transaction is required",
    });
  }
  if (!total_point) {
    return res.status(400).json({
      error: true,
      message: "total point transaction is required",
    });
  }
  try {
    const updateData = {
      transaction_longitude_start: longitude_start,
      transaction_latitude_start: latitude_start,
      transaction_longitude_destination: longitude_destination,
      transaction_latitude_destinantion: latitude_destination,
      transaction_total_payment: total_payment,
      transaction_total_weight: total_weight,
      transaction_total_point: total_point,
      updated_at: db.fn.now(),
    };
    const transaction = await db("tbl_transaction")
        .where({ transaction_id: id })
        .update(updateData);
    if (transaction) {
      res.status(200).json({
        error: false,
        message: "Update transaction successful",
      });
    } else {
      res.status(401).json({
        error: true,
        message: "Update transaction failed",
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
const deleteTransactionController = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id transaction is required",
    });
  }
  try {
    const transaction = await db("tbl_transaction").where({ transaction_id: id }).delete();
    if (transaction) {
      res.status(200).json({
        error: false,
        message: "Delete transaction successful",
      });
    } else {
      res.status(401).json({
        error: true,
        message: "Delete transaction failed",
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
  getAllTransactionController,
  getTransactionByIdController,
  insertTransactionController,
  updateTransactionController,
  deleteTransactionController,
};
