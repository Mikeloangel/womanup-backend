const Todo = require('../models/todo');

// get all todos
module.exports.getTodos = (req, res, next) => {
  Todo.find({})
    .then((todos) => res.send(todos))
    .catch(next);
}

// post single todo
module.exports.postTodo = (req, res, next) => {
  const { caption, description, expires, isFinished = false, fileList } = req.body;

  Todo.create({ caption, description, expires, isFinished, fileList })
    .then((todo) => {
      res.status(201).send(todo);
    })
    .catch(next);
}

// put done id is in param
module.exports.putDone = (req, res, next) => {
  const { id } = req.params;

  Todo.findByIdAndUpdate(id, { isFinished: true }, { new: true })
    .then((updatedTodo) => res.send(updatedTodo))
    .catch(next);
}

// delete done id is param
module.exports.deleteDone = (req, res, next) => {
  const { id } = req.params;
  Todo.findByIdAndUpdate(id, { isFinished: false }, { new: true })
    .then((updatedTodo) => res.send(updatedTodo))
    .catch(next);
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

