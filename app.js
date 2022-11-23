const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const path = require('path')

const todoRoutes = require('./routers/todo');
const { handleErrors } = require('./middlwares/handleErrors');
const ResourceNotFoundError = require('./errors/not-found-error');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/womanup');
const app = express();

// front end static folder
app.use('/', express.static(path.join(__dirname, 'public')))

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// todo api routes
app.use('/api',todoRoutes);

// handle 404
app.all('/api/*', (req, res, next) => {
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


