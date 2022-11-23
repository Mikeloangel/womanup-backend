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
    .orFail()
    .then((updatedTodo) => res.send(updatedTodo))
    .catch(next);
}

// delete done id is param
module.exports.deleteDone = (req, res, next) => {
  const { id } = req.params;
  Todo.findByIdAndUpdate(id, { isFinished: false }, { new: true })
    .orFail()
    .then((updatedTodo) => res.send(updatedTodo))
    .catch(next);
}

// patches todo
module.exports.patchTodo = (req, res, next) => {
  const { id } = req.params;
  const { caption, description, expires, isFinished, fileList } = req.body;

  Todo.findByIdAndUpdate(
    id,
    { caption, description, expires, isFinished, fileList },
    { new: true, runValidators: true }
  )
    .then(updatedTodo => res.send(updatedTodo))
    .catch(next);
}

// deletes todo
module.exports.deleteTodo = (req, res, next) => {
  const { id } = req.params;

  Todo.deleteOne({ id })
    .orFail()
    .then(() => {
      res.send({ message: 'ok' });
    })
    .catch(next);
}
