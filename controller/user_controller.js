const { v4: uuidv4 } = require("uuid");
const knex = require("knex");
const bcrypt = require("bcrypt");
const knexfile = require("../knexfile");
const { uploadFileToStorage } = require("../modules/multer_modules");
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
    const user = await
    db.raw(
        "SELECT tbl_user.*,tbl_subscription.subscription_id, tbl_subscription.subscription_status, tbl_subscription.subscription_value FROM tbl_user INNER JOIN tbl_subscription ON tbl_user.subscription_id = tbl_subscription.subscription_id WHERE tbl_user.user_id = ?",
        [id],
    );
    if (user) {
      return res.status(200).json({
        error: false,
        message: "Request successful",
        data: user[0][0],
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
const logInWithGoogleUserController = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      error: true,
      message: "Email user is required",
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
      const response = await db
          .from("tbl_user")
          .where({ user_id: user.user_id })
          .update({ user_token: user_token });
      if (response) {
        return res.status(200).json({
          error: false,
          message: "Request successful",
          data: {
            user_id: user.user_id,
            user_token: user_token,
          },
        });
      }
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
const signInWithGoogleUserController = async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name) {
    return res.status(400).json({
      error: true,
      message: "Name user is required",
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
  try {
    const data = {
      user_name: name,
      user_email: email,
      user_phone: phone,
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
  const { name, email, phone, longitude, latitude } = req.body;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id user is required",
    });
  }
  try {
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
  const { subscription_id } = req.body;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id user is required",
    });
  }
  if (!subscription_id) {
    return res.status(400).json({
      error: true,
      message: "Subscription user is required",
    });
  }
  try {
    const updateData = {
      subscription_id: subscription_id,
      user_subscription_date: db.fn.now(),
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
const uploadUserController = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id user is required",
    });
  }
  if (!req.file) {
    return res.status(400).json({
      error: true,
      message: "Profile user is required",
    });
  }
  try {
    await uploadFileToStorage(req.file, "User");
    const url = "https://storage.googleapis.com/ecotup-development-bucket/User/"+ req.file.originalname;
    const updateData = {
      user_profile: url,
      updated_at: db.fn.now(),
    };
    await db("tbl_user").where({ user_id: id }).update(updateData);
    res.status(200).json({
      error: false,
      message: "Upload user profile successful",
      user_profile: url,
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: "Upload user profile failed",
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
  signInWithGoogleUserController,
  logInUserController,
  logInWithGoogleUserController,
  getAllUserController,
  getUserByIdController,
  updateUserController,
  updateUserPointController,
  updateUserPasswordController,
  updateUserSubscriptionController,
  uploadUserController,
  deleteUserController,
};
