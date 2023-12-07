const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const port = process.env.PORT || 8000;
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
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
app.post("/api/user/upload/profile/:id", upload.single("file"), async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id user is required",
    });
  }
  try {
    const file = req.file;
    const bucketName = "ecotup-development-bucket";
    const [uploadedFile] = await storage
        .bucket(bucketName)
        .upload(file.buffer, {
          destination: file.originalname,
          metadata: {
            contentType: file.mimetype,
          },
        });
    const updateData = {
      user_profile: uploadedFile.name,
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
});

app.post("/api/driver/upload/profile/:id", upload.single("file"), async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id user is required",
    });
  }
  try {
    const file = req.file;
    const bucketName = "ecotup-development-bucket";
    const [uploadedFile] = await storage
        .bucket(bucketName)
        .upload(file.buffer, {
          destination: file.originalname,
          metadata: {
            contentType: file.mimetype,
          },
        });
    const updateData = {
      driver_profile: uploadedFile.name,
      updated_at: db.fn.now(),
    };
    const driver = await db("tbl_driver").where({ driver_id: id }).update(updateData);
    if (driver) {
      return res.status(200).json({
        error: false,
        message: "Update driver profile successful",
      });
    } else {
      return res.status(401).json({
        error: true,
        message: "Update driver profile failed",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
      debug: error.message,
    });
  }
});


app.use("/api/user", require("./routes/user_routes"));
app.use("/api/driver", require("./routes/driver_routes"));
app.use("/api/article", require("./routes/article_routes"));
app.use("/api/reward", require("./routes/reward_routes"));
app.use("/api/subscription", require("./routes/subscription_routes"));
app.use("/api/transaction", require("./routes/transaction_routes"));
app.use("/api/cluster", require("./routes/cluster_routes"));

app.listen(port, () => {
  console.log("Server is up and listening on " + port);
});
