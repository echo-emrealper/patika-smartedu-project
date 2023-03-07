//MODULES
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

//VARIABLES
const app = express();
const port = 3000;

// CONNECT
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/smartedu-db').then(() => {
  console.log('DB connected successfully');
});

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.json({}));
app.use(express.urlencoded({ extended: false }));

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

//ROUTES
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

// LISTENER
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
