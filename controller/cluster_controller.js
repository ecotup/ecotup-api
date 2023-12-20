const knex = require("knex");
const knexfile = require("../knexfile");
const axios = require("axios");
const db = knex(knexfile.development);

const getAllClusterController = async (req, res) => {
  try {
    const clusters = await db.select().from("tbl_cluster");
    if (clusters) {
      return res.status(200).json({
        error: false,
        message: "Request successful",
        data: clusters,
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
const getClusterByIdController = async (req, res) => {
  const { user_id, driver_id } = req.body;
  if (driver_id) {
    try {
      const cluster = await db
          .select(
              "driver_id",
              "user_id",
              "cluster_id",
              "cluster_name",
              "cluster_region",
              "updated_at",
          )
          .from("tbl_cluster")
          .where({ driver_id: driver_id });
      if (cluster) {
        return res.status(200).json({
          error: false,
          message: "Request successful",
          data: cluster,
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
      const cluster = await db
          .select(
              "user_id",
              "driver_id",
              "cluster_id",
              "cluster_name",
              "cluster_region",
              "updated_at",
          )
          .from("tbl_cluster")
          .where({ user_id: user_id })
          .first();
      if (cluster) {
        return res.status(200).json({
          error: false,
          message: "Request successful",
          data: cluster,
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
  } else {
    return res.status(404).json({
      error: true,
      message: "Request not found",
    });
  }
};
const insertClusterController = async (req, res) => {
  const {
    driver_id,
    user_id,
    name,
    region,
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
  if (!name) {
    return res.status(400).json({
      error: true,
      message: "Name cluster is required",
    });
  }

  if (!region) {
    return res.status(400).json({
      error: true,
      message: "Region cluster is required",
    });
  }
  try {
    const data = {
      user_id: user_id,
      driver_id: driver_id,
      cluster_name: name,
      cluster_region: region,
      created_at: db.fn.now(),
    };
    const cluster = await db("tbl_cluster").insert(data);
    if (cluster) {
      return res.status(200).json({
        error: false,
        message: "Register cluster successful",
      });
    } else {
      return res.status(401).json({
        error: true,
        message: "Register cluster failed",
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
const updateClusterController = async (req, res) => {
  const { id } = req.params;
  const {
    name, region,
  } = req.body;
  try {
    const updateData = {
      cluster_name: name,
      cluster_region: region,
      updated_at: db.fn.now(),
    };
    const cluster = await db("tbl_cluster")
        .where({ cluster_id: id })
        .update(updateData);
    if (cluster) {
      return res.status(200).json({
        error: false,
        message: "Update cluster successful",
      });
    } else {
      return res.status(401).json({
        error: true,
        message: "Update cluster failed",
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
const deleteClusterController = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id cluster is required",
    });
  }
  try {
    const cluster = await db("tbl_cluster")
        .where({ cluster_id: id })
        .delete();
    if (cluster) {
      return res.status(200).json({
        error: false,
        message: "Delete cluster successful",
      });
    } else {
      return res.status(401).json({
        error: true,
        message: "Delete cluster failed",
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
  getAllClusterController,
  getClusterByIdController,
  insertClusterController,
  updateClusterController,
  deleteClusterController,
};
