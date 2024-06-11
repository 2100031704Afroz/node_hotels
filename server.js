const express = require('express');
const db = require('./db');
const app = express();
require('dotenv').config()
const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Welcome to our hotel');
});


const personRoutes = require('./routes/personRoutes');

app.use('/person',personRoutes);

const menuRoutes = require('./routes/menuRoutes');

app.use('/menu',menuRoutes);

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
