const express = require('express');
const mongoose = require('mongoose');

const todoRoutes = require('./routers/todo');

const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { handleErrors } = require('./middlwares/handleErrors');
const { PORT = 3000 } = process.env;
const ResourceNotFoundError = require('./errors/not-found-error');

mongoose.connect('mongodb://localhost:27017/womanup');
const app = express();

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(todoRoutes);

// handle 404
app.all('*', (req, res, next) => {
  next(new ResourceNotFoundError());
});

// // celebrate handle errors
app.use(errors());
app.use(handleErrors);

// let's start a server
app.listen(PORT, () => {
  console.log('Welcome to BACKEND');
  console.log('WomanUp test task for Todo list ');
});


