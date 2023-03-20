//MODULES
const express = require('express');
const ejs = require('ejs');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

//VARIABLES
const app = express();
const port = process.env.PORT || 10000;
global.userIN = null;

// CONNECT
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://hipotetik:tMeQBbpKYN8yzOMR@education.gmmznig.mongodb.net/smartedu-db?retryWrites=true&w=majority').then(() => {
  console.log('DB connected successfully');
});

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.json({}));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: 'mongodb://127.0.0.1:27017/smartedu-db',
    }),
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

//ROUTES
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

// LISTENER
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
