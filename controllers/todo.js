const Todo = require('../models/todo');

module.exports.getTodos = (req, res, next) => {
  res.send({ get: 'todos' });
}

module.exports.postTodo = (req, res, next) => {
  res.send({ post: 'todos' });
}

module.exports.putDone = (req, res, next) => {
  res.send({ putDone: 'todos' });
}

module.exports.patchTodo = (req, res, next) => {
  res.send({ patchTodo: 'todos' });
}

module.exports.deleteTodo = (req, res, next) => {
  res.send({ deleteTodo: 'todos' });
}


// routes to implement
// get all todos
// post todo {caption, description, expiresby, linked files (i will use links)}
// put done todo id
// patch todo id
// delete todo id

