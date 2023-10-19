const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT_1 || process.env.PORT_2;

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/user_routes"));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
