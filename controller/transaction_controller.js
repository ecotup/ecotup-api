const knex = require("knex");
const knexfile = require("../knexfile");
const db = knex(knexfile.development);

const getAllTransactionController = async (req, res) => {
  try {
    const transactions = await db.select().from("tbl_transaction");
    if (transactions) {
      return res.status(200).json({
        error: false,
        message: "Request successful",
        data: transactions,
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

const getTransactionByIdController = async (req, res) => {
  const { user_id, driver_id } = req.body;
  if (!user_id || !driver_id) {
    return res.status(400).json({
      error: true,
      message: "Id user or driver is required",
    });
  }
  if (driver_id) {
    try {
      const transaction = await db
          .select(
              "driver_id",
              "transaction_longitude_start",
              "transaction_latitude_start",
              "transaction_longitude_destination",
              "transaction_latitude_destination",
              "transaction_description",
              "transaction_total_payment",
              "transaction_total_weight",
              "transaction_total_point",
              "transaction_status",
              "updated_at",
          )
          .from("tbl_transaction")
          .where({ driver_id: driver_id })
          .first();
      if (transaction) {
        return res.status(200).json({
          error: false,
          message: "Request successful",
          data: transaction,
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
  }
  if (user_id) {
    try {
      const transaction = await db
          .select(
              "user_id",
              "transaction_longitude_start",
              "transaction_latitude_start",
              "transaction_longitude_destination",
              "transaction_latitude_destination",
              "transaction_description",
              "transaction_total_payment",
              "transaction_total_weight",
              "transaction_total_point",
              "transaction_status",
              "updated_at",
          )
          .from("tbl_transaction")
          .where({ user_id: user_id })
          .first();
      if (transaction) {
        return res.status(200).json({
          error: false,
          message: "Request successful",
          data: transaction,
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
  }
};
const insertTransactionController = async (req, res) => {
  const {
    driver_id,
    user_id,
    longitude_start,
    latitude_start,
    longitude_destination,
    latitude_destination,
    description,
    total_payment,
    total_weight,
    total_point,
    status,
  } = req.body;
  if (!driver_id) {
    return res.status(400).json({
      error: true,
      message: "Id driver is required",
    });
  }
  if (!user_id) {
    return res.status(400).json({
      error: true,
      message: "Id user is required",
    });
  }
  if (!longitude_start) {
    return res.status(400).json({
      error: true,
      message: "Longitude start transaction is required",
    });
  }
  if (!latitude_start) {
    return res.status(400).json({
      error: true,
      message: "Latitude start transaction is required",
    });
  }
  if (!longitude_destination) {
    return res.status(400).json({
      error: true,
      message: "Longitude destination transaction is required",
    });
  }
  if (!latitude_destination) {
    return res.status(400).json({
      error: true,
      message: "Latitude destination transaction is required",
    });
  }
  if (!total_payment) {
    return res.status(400).json({
      error: true,
      message: "Total payment transaction is required",
    });
  }
  if (!total_weight) {
    return res.status(400).json({
      error: true,
      message: "Total weight transaction is required",
    });
  }
  if (!total_point) {
    return res.status(400).json({
      error: true,
      message: "Total point transaction is required",
    });
  }
  if (!status) {
    return res.status(400).json({
      error: true,
      message: "Status transaction is required",
    });
  }
  try {
    const data = {
      user_id: user_id,
      driver_id: driver_id,
      transaction_description: description,
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
      return res.status(200).json({
        error: false,
        message: "Register transaction successful",
      });
    } else {
      return res.status(401).json({
        error: true,
        message: "Register transaction failed",
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
      return res.status(200).json({
        error: false,
        message: "Update transaction successful",
      });
    } else {
      return res.status(401).json({
        error: true,
        message: "Update transaction failed",
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
const updateTransactionStatusController = async (req, res) => {
  const { id } = req.params;
  const {
    status,
  } = req.body;
  if (!status) {
    return res.status(400).json({
      error: true,
      message: "Status transaction is required",
    });
  }
  try {
    const updateData = {
      transaction_status: status,
      updated_at: db.fn.now(),
    };
    const transaction = await db("tbl_transaction")
        .where({ transaction_id: id })
        .update(updateData);
    if (transaction) {
      return res.status(200).json({
        error: false,
        message: "Update transaction successful",
      });
    } else {
      return res.status(401).json({
        error: true,
        message: "Update transaction failed",
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
const deleteTransactionController = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id transaction is required",
    });
  }
  try {
    const transaction = await db("tbl_transaction")
        .where({ transaction_id: id })
        .delete();
    if (transaction) {
      return res.status(200).json({
        error: false,
        message: "Delete transaction successful",
      });
    } else {
      return res.status(401).json({
        error: true,
        message: "Delete transaction failed",
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
  getAllTransactionController,
  getTransactionByIdController,
  insertTransactionController,
  updateTransactionController,
  updateTransactionStatusController,
  deleteTransactionController,
};
