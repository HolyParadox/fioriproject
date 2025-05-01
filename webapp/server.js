const express = require("express");
const app = express();
const port = 3000;
const multer = require("multer");
const path = require("path");

// Set up Multer middleware to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Set up a route to handle file uploads
app.post("/upload", upload.single("pdfFile"), (req, res) => {
  console.log(req.file);
  res.send("File uploaded!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});