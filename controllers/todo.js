const Todo = require('../models/todo');

module.exports.getTodos = (req, res, next) => {
  res.send({ get: 'todos' });
}

module.exports.postTodo = (req, res, next) => {
  const { caption, description, expires, isFinished = false, fileList } = req.body;

  Todo.create({ caption, description, expires, isFinished, fileList })
    .then((todo) => {
      res.status(201).send(todo);
    })
    .catch(next);
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

