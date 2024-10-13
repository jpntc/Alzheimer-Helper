// Required packages: Express, Mongoose, Multer, Cloudinary for cloud storage

const express = require('express');
const mongoose = require('mongoose');
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
  mongoose.connect('mongodb://localhost/alzheimer-helper', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const PhotoSchema = new mongoose.Schema({
    url: String,
    label: String,
    userId: mongoose.Schema.Types.ObjectId,
  });

  const Photo = mongoose.model('Photo', PhotoSchema);

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

  app.post('/upload', upload.single('photo'), async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.redirect('/signin');
    }

    const { label } = req.body;
    const photo = new Photo({
      url: req.file.path,
      label,
      userId: req.user.id,
    });
    await photo.save();

    res.redirect('/game');
  });

  // Server Setup
  app.listen(PORT, () => {
    console.log(`Photo upload server running on http://localhost:${PORT}`);
  });

  return app;
}

module.exports = createPhotoUploadApp;