//MODULES
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');

//VARIABLES
const app = express();
const port = 3000;

// CONNECT
mongoose.set('strictQuery', false);
mongoose
  .connect('mongodb://127.0.0.1:27017/smartedu-db')
  .then('BD connected successfully');

// MIDDLEWARES
app.use(express.static('public'));

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

//ROUTES
app.use('/', pageRoute);
app.use('/courses', courseRoute);

// LISTENER
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
