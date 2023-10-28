const knex = require("knex");
const knexfile = require("../../knexfile");
const db = knex(knexfile.development);

const getHistoryByIdController = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id history is required",
    });
  }
  try {
    const history = await db
        .select()
        .from("tbl_history")
        .where({ history_id: id })
        .first();
    if (history) {
      res.status(200).json({
        error: false,
        message: "Request successful",
        data: history,
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
module.exports = {
  getHistoryByIdController,
};
