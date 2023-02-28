//MODULES
const express = require('express');
const ejs = require('ejs');

//VARIABLES
const app = express();
const port = 3000;

// MIDDLEWARES
app.use(express.static('public'));

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

//ROUTES
app.get('/', (req, res) => {
  res.status(200).render('index', {
    page_name: 'index',
  });
});

app.get('/about', (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
});

// LISTENER
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
