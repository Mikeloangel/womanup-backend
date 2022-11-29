const express = require('express');
const rateLimit = require('express-rate-limit');
// var cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const path = require('path')

const todoRoutes = require('./routers/todo');
const { handleErrors } = require('./middlwares/handleErrors');
const ResourceNotFoundError = require('./errors/not-found-error');

// const { PORT = 3000 } = process.env;
const PORT = 3200;

mongoose.connect('mongodb://localhost:27017/womanup');
const app = express();

// limits to 100 requests in 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);

// enabling cors *
// app.use(cors());

// front end static folder
// app.use('/', express.static(path.join(__dirname, 'public')))

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// todo api routes
app.use('/api', todoRoutes);

// handle 404
app.all('/api/*', (req, res, next) => {
  next(new ResourceNotFoundError());
});

// handle react routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// handle errors
// celebrate
app.use(errors());
// centralized middleware
app.use(handleErrors);

// let's start a server
app.listen(PORT, () => {
  console.log('Welcome to BACKEND');
  console.log('WomanUp test task for Todo list ');
});


