require("dotenv").config();
module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: process.env.DB_HOST ||"34.101.70.239",
      user: process.env.DB_USER ||"Ecotup_Access",
      password: process.env.DB_PASSWORD ||"ecotup*",
      database: process.env.DB_NAME||"db_ecotup",
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};
