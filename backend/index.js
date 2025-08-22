import cors from "cors";
import express from "express";

const app = express();
app.use(cors());

const PORT = 5000;

// Middleware
app.use(express.json());

let resumes = [];

// POST request to add a resume
app.post("/api/resumes", (req, res) => {
  const newResume = req.body;
  resumes.push(newResume);
  res.status(201).json(newResume);
});

// GET request to fetch all resumes
app.get("/api/resumes", (req, res) => {
  res.json(resumes);
});

// Default route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
