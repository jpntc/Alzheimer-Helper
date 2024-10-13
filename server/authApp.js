// Required packages: Express, Mongoose, Passport for Authentication

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();

// User Authentication and Database Setup
function createAuthApp() {
  const app = express();
  const PORT = 3000;

  // Database Setup
  mongoose.connect('mongodb://localhost/alzheimer-helper', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
  });

  const User = mongoose.model('User', UserSchema);

  // Middleware Setup
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // Passport Setup
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) return done(null, false, { message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false, { message: 'Incorrect password' });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  // Routes
  app.get('/signup', (req, res) => {
    res.send('<form action="/signup" method="post">Username: <input type="text" name="username"><br>Password: <input type="password" name="password"><br><input type="submit"></form>');
  });

  app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.redirect('/signin');
  });

  app.get('/signin', (req, res) => {
    res.send('<form action="/signin" method="post">Username: <input type="text" name="username"><br>Password: <input type="password" name="password"><br><input type="submit"></form>');
  });

  app.post('/signin', passport.authenticate('local', {
    successRedirect: '/upload',
    failureRedirect: '/signin',
  }));

  return app;
}

module.exports = createAuthApp;