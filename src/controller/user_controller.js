const { v4: uuidv4 } = require("uuid");
const knex = require("knex");
const bcrypt = require("bcrypt");
const knexfile = require("../../knexfile");
const db = knex(knexfile.development);

const getAllUserController = async (req, res) => {
  try {
    const users = await db.select().from("tbl_user");
    res.status(200).json({
      error: false,
      message: "Request successful",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
  res.status(404).json({
    error: true,
    message: "Request not found",
  });
};
const getUserByIdController = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id user is required",
    });
  }
  try {
    const users = await db
        .select()
        .from("tbl_user")
        .where({ user_id: id})
        .first();
    res.status(200).json({
      error: false,
      message: "Request successful",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
  res.status(404).json({
    error: true,
    message: "Request not found",
  });
};
const logInController = async (req, res) => {
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
      const isPasswordValid = await bcrypt.compare(password, user.user_password);
      if (isPasswordValid) {
        res.status(200).json({
          error: false,
          message: "Login successful",
          data: {
            id_user: user.user_id,
            token: user_token,
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
const signInController = async (req, res) => {
  const { name, password, email, phone, location } = req.body;
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
  if (!location) {
    return res.status(400).json({
      error: true,
      message: "Location user is required",
    });
  }
  try {
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const newData = {
      user_name: name,
      user_password: hashPassword,
      user_email: email,
      user_phone: phone,
      user_location: location,
    };
    const user = await db("tbl_user").insert(newData);
    if (user) {
      res.status(200).json({
        error: false,
        message: "Register user successful",
      });
    } else {
      res.status(401).json({
        error: true,
        message: "Register user failed",
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
const updateUserController = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, location } = req.body;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id user is required",
    });
  }
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
  if (!location) {
    return res.status(400).json({
      error: true,
      message: "Location user is required",
    });
  }
  try {
    const updateData = {
      user_name: name,
      user_email: email,
      user_phone: phone,
      user_location: location,
    };
    const user = await db("tbl_user").where({ user_id: id }).update(updateData);
    if (user) {
      res.status(200).json({
        error: false,
        message: "Update user successful",
      });
    } else {
      res.status(401).json({
        error: true,
        message: "Update user failed",
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
const updateUserRolesController = async (req, res) => {
  const { id } = req.params;
  const { roles } = req.body;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id user is required",
    });
  }
  if (!roles) {
    return res.status(400).json({
      error: true,
      message: "Roles user is required",
    });
  }
  try {
    const updateData = {
      user_roles: roles,
    };
    const user = await db("tbl_user").where({ user_id: id }).update(updateData);
    if (user) {
      res.status(200).json({
        error: false,
        message: "Update user roles successful",
      });
    } else {
      res.status(401).json({
        error: true,
        message: "Update user roles failed",
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
      res.status(200).json({
        error: false,
        message: "Delete user successful",
      });
    } else {
      res.status(401).json({
        error: true,
        message: "Delete user failed",
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
  signInController,
  logInController,
  getAllUserController,
  getUserByIdController,
  updateUserController,
  updateUserPasswordController,
  updateUserRolesController,
  deleteUserController,
};
