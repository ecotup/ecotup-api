const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
);

app.get("/", (req, res) => {
  console.log("Response success");
  res.send("Response Success!");
});

app.use("/api/user", require("./routes/user_routes"));
app.use("/api/driver", require("./routes/driver_routes"));
app.use("/api/article", require("./routes/article_routes"));
app.use("/api/reward", require("./routes/reward_routes"));
app.use("/api/subscription", require("./routes/subscription_routes"));
app.use("/api/transaction", require("./routes/transaction_routes"));

app.listen(port, () => {
  console.log("Server is up and listening on " + port);
});
