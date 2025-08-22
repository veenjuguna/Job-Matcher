import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// in-memory array to store submitted names
let jobs = [];

app.get("/api/jobs", (req, res) => {
  res.json(jobs);
});

app.post("/api/jobs", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  const newJob = { id: jobs.length + 1, name };
  jobs.push(newJob);
  res.status(201).json(newJob);
});
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
