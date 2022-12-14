const Todo = require('../models/todo');

const WrongDataError = require('../errors/wrong-data-error');
const ResourceNotFoundError = require('../errors/not-found-error');

// get all todos
module.exports.getTodos = (req, res, next) => {
  Todo.find({})
    .then((todos) => res.send(todos))
    .catch(next);
}

// get todo by id
module.exports.getTodoById = (req, res, next) => {
  const { id } = req.params;
  Todo.find({ _id: id })
    .orFail()
    .then((todo) => res.send(todo))
    .catch((err) => {
      const responceError = {
        CastError: new WrongDataError(),
        DocumentNotFoundError: new ResourceNotFoundError(),
      };

      next(responceError[err.name] || err);
    });
}

// post single todo
module.exports.postTodo = (req, res, next) => {
  const { caption, description, expires, isFinished = false, fileList } = req.body;

  Todo.create({ caption, description, expires, isFinished, fileList })
    .then((todo) => {
      res.status(201).send(todo);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new WrongDataError());
      } else {
        next(err);
      }
    });
}

// put done to todo, id is in param
module.exports.putDone = (req, res, next) => {
  const { id } = req.params;

  Todo.findByIdAndUpdate(id, { isFinished: true }, { new: true })
    .orFail()
    .then((updatedTodo) => res.send(updatedTodo))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new WrongDataError());
      } else if (err.name === 'DocumentNotFoundError') {
        next(new ResourceNotFoundError());
      } else {
        next(err);
      }
    });
}

// delete done to todo, id is in param
module.exports.deleteDone = (req, res, next) => {
  const { id } = req.params;
  Todo.findByIdAndUpdate(id, { isFinished: false }, { new: true })
    .orFail()
    .then((updatedTodo) => res.send(updatedTodo))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new WrongDataError());
      } else if (err.name === 'DocumentNotFoundError') {
        next(new ResourceNotFoundError());
      } else {
        next(err);
      }
    });
}

// patches to do fields returns updated todo
module.exports.patchTodo = (req, res, next) => {
  const { id } = req.params;
  const { caption, description, expires, isFinished, fileList } = req.body;

  Todo.findByIdAndUpdate(
    id,
    { caption, description, expires, isFinished, fileList },
    { new: true, runValidators: true }
  )
    .orFail()
    .then(updatedTodo => res.send(updatedTodo))
    .catch((err) => {
      console.log(err.name)
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new WrongDataError());
      }

      if (err.name === 'DocumentNotFoundError') {
        next(new ResourceNotFoundError());
      } else {
        next(err);
      }
    });
}

// deletes todo
module.exports.deleteTodo = (req, res, next) => {
  const { id } = req.params;

  Todo.deleteOne({ _id: id })
    .orFail()
    .then(() => {
      res.send({ message: 'ok' });
    })
    .catch(next);
}
