const express = require('express');
const db = require('./db');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const passport = require('./auth');

// Middleware for logging requests
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`);
  next();
};

// Apply middleware
app.use(bodyParser.json());
app.use(logRequest);
app.use(passport.initialize());

// Custom authentication middleware
const localAuthMiddleware = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // Respond with the message if authentication fails
      return res.status(401).json({ message: info.message });
    }
    // Successful authentication
    req.user = user; // Attach user to request object
    next();
  })(req, res, next);
};

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to our hotel');
});

const personRoutes = require('./routes/personRoutes');
app.use('/person', localAuthMiddleware, personRoutes);

const menuRoutes = require('./routes/menuRoutes');
app.use('/menu', menuRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
