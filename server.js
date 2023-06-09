const express = require('express');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

// turn on routes
app.use(routes);

// turn on connection to db and server
  app.listen(PORT, () => console.log('Now listening'));