// backend/index.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:5173" })); // frontend dev server port
app.use(express.json());

let users = []; // in-memory storage for now

// GET all users
app.get("/users", (req, res) => {
  res.json(users);
});

// POST new user
app.post("/users", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });
  users.push({ name });
  res.status(201).json({ message: "User saved" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
