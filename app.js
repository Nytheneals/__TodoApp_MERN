const express = require('express');

const app = express();
const routes = require('./routes/router.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/api', routes);
app.get('/', (req, res) => {
  res.json({ Group_Name: 'Bafana, Bafana' });
});

app.use((err, req, res, next) => {
  res.send({ error: err.message });
  console.log({ error: err.message });
});
// ERROR handling MIDDLEWARE

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE, { useMongoClient: true });
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

app.listen(process.env.PORT || 3400, () => console.log('App running on PORT 3000!'));
