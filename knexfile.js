require("dotenv").config();
module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: process.env.DB_HOST || "34.128.90.76",
      user: process.env.DB_USER || "Ecotup_user",
      password: process.env.DB_PASSWORD || "ecotup!",
      database: process.env.DB_NAME || "db_ecotup",
    },
  },
};
