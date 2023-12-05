const { v4: uuidv4 } = require("uuid");
const knex = require("knex");
const bcrypt = require("bcrypt");
const knexfile = require("../knexfile");
const db = knex(knexfile.development);
const getAllUserController = async (req, res) => {
  try {
    const users = await db.select().from("tbl_user");
    if (users) {
      return res.status(200).json({
        error: false,
        message: "Request successful",
        data: users,
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
const getUserByIdController = async (req, res) => {
  const { id } = req.params;
  const token = req.headers;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id user is required",
    });
  }
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token user is required",
    });
  }
  try {
    const user = await db
        .select()
        .from("tbl_user")
        .where({ user_id: id })
        .first();
    if (user) {
      return res.status(200).json({
        error: false,
        message: "Request successful",
        data: user,
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
const logInUserController = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({
      error: true,
      message: "Email user is required",
    });
  }
  if (!password) {
    return res.status(400).json({
      error: true,
      message: "Password user is required",
    });
  }
  try {
    const user_token = uuidv4();
    const user = await db
        .select()
        .from("tbl_user")
        .where({ user_email: email })
        .first();
    if (user) {
      const isPasswordValid = await bcrypt.compare(
          password,
          user.user_password,
      );
      if (isPasswordValid) {
        await db
            .from("tbl_user")
            .where({ user_id: user.user_id })
            .update({ user_token: user_token });
        return res.status(200).json({
          error: false,
          message: "Login successful",
          data: {
            id_user: user.user_id,
            token: user_token,
          },
        });
      } else {
        return res.status(401).json({
          error: true,
          message: "Login failed Invalid credentials",
        });
      }
    } else {
      return res.status(401).json({
        error: true,
        message: "Login failed Invalid credentials",
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
const signInUserController = async (req, res) => {
  const { name, password, email, phone, longitude, latitude } = req.body;
  const saltRounds = 10;
  if (!name) {
    return res.status(400).json({
      error: true,
      message: "Name user is required",
    });
  }
  if (!password) {
    return res.status(400).json({
      error: true,
      message: "Password user is required",
    });
  }
  if (!email) {
    return res.status(400).json({
      error: true,
      message: "Email user is required",
    });
  }
  if (!phone) {
    return res.status(400).json({
      error: true,
      message: "Number phone user is required",
    });
  }
  if (!longitude) {
    return res.status(400).json({
      error: true,
      message: "Longitude user is required",
    });
  }
  if (!latitude) {
    return res.status(400).json({
      error: true,
      message: "Latitude user is required",
    });
  }
  try {
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const data = {
      user_name: name,
      user_password: hashPassword,
      user_email: email,
      user_phone: phone,
      user_longitude: longitude,
      user_latitude: latitude,
      created_at: db.fn.now(),
    };
    const user = await db("tbl_user").insert(data);
    if (user) {
      return res.status(200).json({
        error: false,
        message: "Register user successful",
      });
    } else {
      return res.status(401).json({
        error: true,
        message: "Register user failed",
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
const updateUserController = async (req, res) => {
  const { id } = req.params;
  const { token } = req.headers;
  const { name, email, phone, longitude, latitude } = req.body;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id user is required",
    });
  }
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token user is required",
    });
  }
  try {
    const isTokenValid = await db
        .select("user_token")
        .from("tbl_user")
        .where({ user_id: id })
        .first();
    if (isTokenValid && isTokenValid.user_token === token) {
      const updateData = {
        user_name: name,
        user_email: email,
        user_phone: phone,
        user_longitude: longitude,
        user_latitude: latitude,
        updated_at: db.fn.now(),
      };
      const user = await db("tbl_user")
          .where({ user_id: id })
          .update(updateData);
      if (user) {
        return res.status(200).json({
          error: false,
          message: "Update user successful",
        });
      } else {
        return res.status(401).json({
          error: true,
          message: "Update user failed",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
      debug: error.message,
    });
  }
};
const updateUserProfileController = async (req, res) => {
  const { id } = req.params;
  let imageUrl = "";
  if (req.file && req.file.cloudStoragePublicUrl) {
    imageUrl = req.file.cloudStoragePublicUrl;
  }
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id user is required",
    });
  }
  try {
    const updateData = {
      user_profile: imageUrl,
      updated_at: db.fn.now(),
    };
    const user = await db("tbl_user").where({ user_id: id }).update(updateData);
    if (user) {
      return res.status(200).json({
        error: false,
        message: "Update user profile successful",
      });
    } else {
      return res.status(401).json({
        error: true,
        message: "Update user profile failed",
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
const updateUserPointController = async (req, res) => {
  const { id } = req.params;
  const { point } = req.body;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id user is required",
    });
  }
  if (!point) {
    return res.status(400).json({
      error: true,
      message: "Point user is required",
    });
  }
  try {
    const updateData = {
      user_point: point,
      updated_at: db.fn.now(),
    };
    const user = await db("tbl_user").where({ user_id: id }).update(updateData);
    if (user) {
      res.status(200).json({
        error: false,
        message: "Update user point successful",
      });
    } else {
      res.status(401).json({
        error: true,
        message: "Update user point failed",
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
const updateUserPasswordController = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const saltRounds = 10;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id user is required",
    });
  }
  if (!password) {
    return res.status(400).json({
      error: true,
      message: "Password user is required",
    });
  }
  try {
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const updateData = {
      user_password: hashPassword,
      updated_at: db.fn.now(),
    };
    const user = await db("tbl_user").where({ user_id: id }).update(updateData);
    if (user) {
      res.status(200).json({
        error: false,
        message: "Update user password successful",
      });
    } else {
      res.status(401).json({
        error: true,
        message: "Update user password failed",
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
const updateUserSubscriptionController = async (req, res) => {
  const { id } = req.params;
  const { subscription } = req.body;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id user is required",
    });
  }
  if (!subscription) {
    return res.status(400).json({
      error: true,
      message: "Subscription user is required",
    });
  }
  try {
    const updateData = {
      subscription_id: Subscription,
      updated_at: db.fn.now(),
    };
    const user = await db("tbl_user").where({ user_id: id }).update(updateData);
    if (user) {
      res.status(200).json({
        error: false,
        message: "Update user subscription successful",
      });
    } else {
      res.status(401).json({
        error: true,
        message: "Update user subscription failed",
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
const deleteUserController = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id user is required",
    });
  }
  try {
    const user = await db("tbl_user").where({ user_id: id }).delete();
    if (user) {
      return res.status(200).json({
        error: false,
        message: "Delete user successful",
      });
    } else {
      return res.status(401).json({
        error: true,
        message: "Delete user failed",
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
  signInUserController,
  logInUserController,
  getAllUserController,
  getUserByIdController,
  updateUserController,
  updateUserProfileController,
  updateUserPointController,
  updateUserPasswordController,
  updateUserSubscriptionController,
  deleteUserController,
};
