// Required packages: Express, Mongoose

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Face Match Game Setup
function createFaceMatchApp() {
  const app = express();
  const PORT = 3001;

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

  // Routes
  app.get('/game', async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.redirect('/signin');
    }

    const photos = await Photo.find({ userId: req.user.id });
    if (photos.length < 4) {
      return res.send('Please upload at least 4 photos to start the game.');
    }

    const randomIndex = Math.floor(Math.random() * photos.length);
    const correctPhoto = photos[randomIndex];
    const shuffledPhotos = photos.sort(() => 0.5 - Math.random()).slice(0, 4);

    let gameHtml = `<p>Who is ${correctPhoto.label}?</p>`;
    shuffledPhotos.forEach((photo) => {
      gameHtml += `<img src="${photo.url}" width="100"><form action="/check" method="post"><input type="hidden" name="guess" value="${photo._id}"><button type="submit">Select</button></form>`;
    });

    res.send(gameHtml);
  });

  app.post('/check', async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.redirect('/signin');
    }

    const { guess } = req.body;
    const photo = await Photo.findById(guess);

    if (!photo) {
      return res.send('Photo not found. <a href="/game">Try again</a>');
    }

    if (photo.label === req.session.correctLabel) {
      res.send('Correct! <a href="/game">Play again</a>');
    } else {
      res.send('Wrong! <a href="/game">Try again</a>');
    }
  });

  // Server Setup
  app.listen(PORT, () => {
    console.log(`Face match game server running on http://localhost:${PORT}`);
  });

  return app;
}

module.exports = createFaceMatchApp;