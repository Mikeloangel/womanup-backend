const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;

const app = express();

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cookie parser
app.use(cookieParser);

// routes
app.get('/', (req, res) => {
  res.send({ message: 'ok' });
})

// celebrate handle errors
app.use(errors);

// let's start a server
app.listen(PORT, () => {
  console.log('Welcome to BACKEND');
  console.log('WomanUp test task for Todo list ');
});