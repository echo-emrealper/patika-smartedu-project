//MODULES
const express = require('express');
const ejs = require('ejs');
const pageRoute = require('./routes/pageRoute');

//VARIABLES
const app = express();
const port = 3000;

// MIDDLEWARES
app.use(express.static('public'));

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

//ROUTES
app.use('/', pageRoute);

// LISTENER
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
