// Required packages: Express, Multer, Cloudinary for cloud storage, SQLite3

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

// Photo Upload Setup
function createPhotoUploadApp() {
  const app = express();
  const PORT = 3002;

  // Cloudinary Setup
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Database Setup
  const db = new sqlite3.Database('./alzheimer-helper.db', (err) => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      console.log('Connected to the SQLite database.');
    }
  });

  // Create Photos Table
  const createPhotosTableQuery = `
    CREATE TABLE IF NOT EXISTS Photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT,
      label TEXT,
      userId INTEGER
    );
  `;

  db.run(createPhotosTableQuery, (err) => {
    if (err) {
      console.error('Error creating Photos table:', err.message);
    }
  });

  // Multer Setup for File Uploads to Cloudinary
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'alzheimer-helper',
      allowed_formats: ['jpg', 'png', 'jpeg'],
    },
  });

  const upload = multer({ storage: storage });

  // Middleware Setup
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.get('/upload', (req, res) => {
    if (!req.isAuthenticated()) {
      return res.redirect('/signin');
    }
    res.send('<form action="/upload" method="post" enctype="multipart/form-data">Photo: <input type="file" name="photo"><br>Label (Name of the person in the photo): <input type="text" name="label"><br><input type="submit"></form>');
  });

  app.post('/upload', upload.single('photo'), (req, res) => {
    if (!req.isAuthenticated()) {
      return res.redirect('/signin');
    }

    const { label } = req.body;
    const userId = req.user.id;
    const url = req.file.path;

    db.run(
      `INSERT INTO Photos (url, label, userId) VALUES (?, ?, ?)`,
      [url, label, userId],
      function (err) {
        if (err) {
          return res.send('Error saving photo: ' + err.message);
        }
        res.redirect('/game');
      }
    );
  });

  // Server Setup
  app.listen(PORT, () => {
    console.log(`Photo upload server running on http://localhost:${PORT}`);
  });

  return app;
}

module.exports = createPhotoUploadApp;