const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/router.js');

const app = express();

// MIDDLEWARE SERVING UP STATIC FILES
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.use('/api', routes);
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

// ERROR handling MIDDLEWARE
app.use((err, req, res, next) => {
  res.send({ error: err.message });
  console.log({ error: err.message });
});

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE, { useMongoClient: true });
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

app.listen(process.env.PORT || 3400, () => console.log('App running on PORT 3400!'));
