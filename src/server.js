const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT|| 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use("/api/users", require("./routes/user_routes"));
app.use("/api/transaction", require("./routes/transaction_routes"));
app.use("/api/subscription", require("./routes/subscription_routes"));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
