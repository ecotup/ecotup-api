const knex = require("knex");
const knexfile = require("../../knexfile");
const db = knex(knexfile.development);

const getUserSubscriptionController = async (req, res) => {
  try {
    const subs = await db.select().from("tbl_subscription");
    res.status(200).json({
      error: false,
      message: "Request successful",
      data: subs,
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
module.exports = {
  getUserSubscriptionController,
};
