import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Setup multer for file uploads
const upload = multer({ dest: "uploads/" });
