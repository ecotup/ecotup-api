const { v4: uuidv4 } = require("uuid");
const knex = require("knex");
const bcrypt = require("bcrypt");
const knexfile = require("../../knexfile");
const db = knex(knexfile.development);

const getAllDriverController = async (req, res) => {
  try {
    const drivers = await db.select().from("tbl_driver");
    res.status(200).json({
      error: false,
      message: "Request successful",
      data: drivers,
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
const getDriverByIdController = async (req, res) => {
  const { id } = req.params;
  const token = req.headers;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id driver is required",
    });
  }
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token driver is required",
    });
  }
  try {
    const driver = await db
        .select()
        .from("tbl_driver")
        .where({ driver_id: id })
        .first();
    if (driver) {
      res.status(200).json({
        error: false,
        message: "Request successful",
        data: driver,
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
const logInDriverController = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({
      error: true,
      message: "Email driver is required",
    });
  }
  if (!password) {
    return res.status(400).json({
      error: true,
      message: "Password driver is required",
    });
  }
  try {
    const driver_token = uuidv4();
    const driver = await db
        .select()
        .from("tbl_driver")
        .where({ driver_email: email })
        .first();
    if (driver) {
      const isPasswordValid = await bcrypt.compare(
          password,
          driver.driver_password,
      );
      if (isPasswordValid) {
        await db
            .from("tbl_driver")
            .where({ driver_id: driver.driver_id })
            .update({ driver_token: driver_token });
        res.status(200).json({
          error: false,
          message: "Login successful",
          data: {
            id_driver: driver.driver_id,
            token: driver_token,
          },
        });
      } else {
        res.status(401).json({
          error: true,
          message: "Login failed Invalid credentials",
        });
      }
    } else {
      res.status(401).json({
        error: true,
        message: "Login failed Invalid credentials",
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
const signInDriverController = async (req, res) => {
  const { name, password, email, phone, longitude, latitude, type, license} = req.body;
  const saltRounds = 10;
  if (!name) {
    return res.status(400).json({
      error: true,
      message: "Name driver is required",
    });
  }
  if (!password) {
    return res.status(400).json({
      error: true,
      message: "Password driver is required",
    });
  }
  if (!email) {
    return res.status(400).json({
      error: true,
      message: "Email driver is required",
    });
  }
  if (!phone) {
    return res.status(400).json({
      error: true,
      message: "Number phone driver is required",
    });
  }
  if (!longitude) {
    return res.status(400).json({
      error: true,
      message: "Longitude driver is required",
    });
  }
  if (!latitude) {
    return res.status(400).json({
      error: true,
      message: "Latitude driver is required",
    });
  }
  if (!type) {
    return res.status(400).json({
      error: true,
      message: "Type driver is required",
    });
  }
  if (!license) {
    return res.status(400).json({
      error: true,
      message: "License driver is required",
    });
  }
  try {
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const data = {
      driver_name: name,
      driver_password: hashPassword,
      driver_email: email,
      driver_phone: phone,
      driver_longitude: longitude,
      driver_latitude: latitude,
      driver_type: type,
      driver_license: license,
      created_at: db.fn.now(),
    };
    const driver = await db("tbl_driver").insert(data);
    if (driver) {
      res.status(200).json({
        error: false,
        message: "Register driver successful",
      });
    } else {
      res.status(401).json({
        error: true,
        message: "Register driver failed",
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
const updateDriverController = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, longitude, latitude, type, license } = req.body;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id driver is required",
    });
  }
  if (!name) {
    return res.status(400).json({
      error: true,
      message: "Name driver is required",
    });
  }
  if (!email) {
    return res.status(400).json({
      error: true,
      message: "Email driver is required",
    });
  }
  if (!phone) {
    return res.status(400).json({
      error: true,
      message: "Number phone driver is required",
    });
  }
  if (!type) {
    return res.status(400).json({
      error: true,
      message: "Type driver is required",
    });
  }
  if (!license) {
    return res.status(400).json({
      error: true,
      message: "License driver is required",
    });
  }
  try {
    const updateData = {
      driver_name: name,
      driver_email: email,
      driver_phone: phone,
      driver_longitude: longitude,
      driver_latitude: latitude,
      driver_type: type,
      driver_license: license,
      updated_at: db.fn.now(),
    };
    const driver = await db("tbl_driver").where({ driver_id: id }).update(updateData);
    if (driver) {
      res.status(200).json({
        error: false,
        message: "Update driver successful",
      });
    } else {
      res.status(401).json({
        error: true,
        message: "Update driver failed",
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
const updatedriverProfileController = async (req, res) => {
  const { id } = req.params;
  const { profile } = req.body;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id driver is required",
    });
  }
  if (!profile) {
    return res.status(400).json({
      error: true,
      message: "Profile driver is required",
    });
  }
  try {
    const updateData = {
      driver_profile: profile,
      updated_at: db.fn.now(),
    };
    const driver = await db("tbl_driver").where({ driver_id: id }).update(updateData);
    if (driver) {
      res.status(200).json({
        error: false,
        message: "Update driver profile successful",
      });
    } else {
      res.status(401).json({
        error: true,
        message: "Update driver profile failed",
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
const updatedriverPointController = async (req, res) => {
  const { id } = req.params;
  const { point } = req.body;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id driver is required",
    });
  }
  if (!point) {
    return res.status(400).json({
      error: true,
      message: "Point driver is required",
    });
  }
  try {
    const updateData = {
      driver_profile: profile,
      updated_at: db.fn.now(),
    };
    const driver = await db("tbl_driver").where({ driver_id: id }).update(updateData);
    if (driver) {
      res.status(200).json({
        error: false,
        message: "Update driver point successful",
      });
    } else {
      res.status(401).json({
        error: true,
        message: "Update driver point failed",
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
const updateDriverPasswordController = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const saltRounds = 10;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id driver is required",
    });
  }
  if (!password) {
    return res.status(400).json({
      error: true,
      message: "Password driver is required",
    });
  }
  try {
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const updateData = {
      driver_password: hashPassword,
      updated_at: db.fn.now(),
    };
    const driver = await db("tbl_driver").where({ driver_id: id }).update(updateData);
    if (driver) {
      res.status(200).json({
        error: false,
        message: "Update driver password successful",
      });
    } else {
      res.status(401).json({
        error: true,
        message: "Update driver password failed",
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
const deleteDriverController = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id driver is required",
    });
  }
  try {
    const driver = await db("tbl_driver").where({ driver_id: id }).delete();
    if (driver) {
      res.status(200).json({
        error: false,
        message: "Delete driver successful",
      });
    } else {
      res.status(401).json({
        error: true,
        message: "Delete driver failed",
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
  signInDriverController,
  logInDriverController,
  getAllDriverController,
  getDriverByIdController,
  updateDriverController,
  updatedriverProfileController,
  updatedriverPointController,
  updateDriverPasswordController,
  deleteDriverController,
};
