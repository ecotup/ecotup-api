const knex = require("knex");
const knexfile = require("../knexfile");
const db = knex(knexfile.development);
const axios = require("axios");
const GOOGLE_MAPS_API_KEY = "AIzaSyCzbzneJg7Hovad7BdJIHUxH2KWricaw7U";

const getDirectionTransactionController = async (req, res) => {
  const { id } = req.params;
  try {
    const direction = await db.select().from("tbl_transaction").where({transaction_id: id}).first();
    const origin = direction.transaction_latitude_start +","+ direction.transaction_longitude_start;
    console.log(origin);
    const destination = direction.transaction_latitude_destination+","+direction.transaction_longitude_destination;
    console.log(destination);
    const base_url = "https://maps.googleapis.com/maps/api/directions/json";
    const params = {
      origin: origin,
      destination: destination,
      travelMode: "driving",
      key: GOOGLE_MAPS_API_KEY,
    };
    await axios
        .get(base_url, { params })
        .then((getResponse) => {
          data = getResponse.data;
          return res.send(data);
        });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
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

const getTransactionController = async (req, res) => {
  const { driver_id, user_id } = req.body;
  if (driver_id) {
    try {
      const transaction = await db
          .select(
              "driver_id",
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
          .where({ driver_id: driver_id });
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
          .where({ user_id: user_id });
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
const getTransactionSubscriptionController = async (req, res) => {
  const { driver_id, user_id} = req.body;
  if (driver_id) {
    try {
      const transaction = await db
          .select(
              "transaction_id",
              "driver_id",
              "user_id",
              "transaction_longitude_start",
              "transaction_latitude_start",
              "transaction_longitude_destination",
              "transaction_latitude_destination",
          )
          .from("tbl_transaction")
          .where({ driver_id: driver_id, transaction_status: "In Completed"});
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
              "transaction_id",
              "driver_id",
              "user_id",
              "transaction_longitude_start",
              "transaction_latitude_start",
              "transaction_longitude_destination",
              "transaction_latitude_destination",
          )
          .from("tbl_transaction")
          .where({ user_id: user_id, transaction_status: "In Completed"});
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
        .where({ transaction_id: id }).first();
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
};
const getTransactionDriverOnGoingController = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await db
        .select(
            "transaction_id",
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
        .where({ driver_id: id, transaction_status: "On Going" });
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
};
const getTransactionLocationDriverController = async (req, res) => {
  const { driver_id, user_id} = req.body;
  if (driver_id && user_id) {
    try {
      const transaction = await db
          .select(
              "transaction_id",
              "driver_id",
              "user_id",
              "transaction_longitude_start",
              "transaction_latitude_start",
          )
          .from("tbl_transaction")
          .where({ driver_id: driver_id, user_id: user_id, transaction_status: "On Going" })
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
  const user = await db
      .select()
      .from("tbl_user")
      .where({ user_id: user_id })
      .first();
  const driver = await db
      .select()
      .from("tbl_driver")
      .where({ driver_id: driver_id })
      .first();
  try {
    const data = {
      user_id: user_id,
      driver_id: driver_id,
      transaction_description: description,
      transaction_longitude_start: driver.driver_longitude,
      transaction_latitude_start: driver.driver_latitude,
      transaction_longitude_destination: user.user_longitude,
      transaction_latitude_destination: user.user_latitude,
      transaction_total_payment: total_payment,
      transaction_total_weight: total_weight,
      transaction_total_point: total_point,
      transaction_status: status,
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
    description,
  } = req.body;
  try {
    const updateData = {
      transaction_longitude_start: longitude_start,
      transaction_latitude_start: latitude_start,
      transaction_longitude_destination: longitude_destination,
      transaction_latitude_destination: latitude_destination,
      transaction_total_payment: total_payment,
      transaction_total_weight: total_weight,
      transaction_total_point: total_point,
      transaction_description: description,
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
const updateTransactionLocationDriverController = async (req, res) => {
  const { id } = req.params;
  const {
    latitude_start,
    longitude_start,
  } = req.body;
  if (!latitude_start) {
    return res.status(400).json({
      error: true,
      message: "Latitude start transaction is required",
    });
  }
  if (!longitude_start) {
    return res.status(400).json({
      error: true,
      message: "Longitude start transaction is required",
    });
  }
  try {
    const updateData = {
      transaction_latitude_start: latitude_start,
      transaction_longitude_start: longitude_start,
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
  getDirectionTransactionController,
  getAllTransactionController,
  getTransactionLocationDriverController,
  getTransactionDriverOnGoingController,
  getTransactionController,
  getTransactionSubscriptionController,
  getTransactionByIdController,
  insertTransactionController,
  updateTransactionController,
  updateTransactionLocationDriverController,
  updateTransactionStatusController,
  deleteTransactionController,
};
