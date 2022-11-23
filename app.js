const express = require('express');
const mongoose = require('mongoose');

const todoRoutes = require('./routers/todo');

const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { handleErrors } = require('./middlwares/handleErrors');
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/womanup');
const app = express();

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(todoRoutes);

// // celebrate handle errors
app.use(errors());
app.use(handleErrors);

// let's start a server
app.listen(PORT, () => {
  console.log('Welcome to BACKEND');
  console.log('WomanUp test task for Todo list ');
});


