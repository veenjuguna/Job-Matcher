const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// In-memory users list
let users = [];

// Routes
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });
  users.push({ id: Date.now(), name });
  res.json({ message: 'User saved!', users });
});

app.post('/api/upload', upload.single('resume'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.json({ message: 'Resume uploaded!', filename: req.file.filename });
});

// Start server
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
