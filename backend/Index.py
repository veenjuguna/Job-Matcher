const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

// Example route
app.get("/api/users", (req, res) => {
  res.json({ users: [] });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
