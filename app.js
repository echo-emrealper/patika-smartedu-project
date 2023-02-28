//MODULES
const express = require('express');

//VARIABLES
const app = express();
const port = 3000;

//ROUTERS
app.get('/', (req, res) => {
  res.status(200).send('index sayfası');
});

// LISTENERS
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
