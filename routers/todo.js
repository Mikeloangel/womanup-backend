// GET / - returns all todos
// GET /:id = returns todo y ids
// POST / - posts a new todo in body, returns new todo
// PUT /done/:id - puts done status expected id in body
// PATCH /done/:id - updates todo by any field returns updated todo
// DELETE /:id - deletes todo by id passed in body

const router = require('express').Router();

const { Joi, celebrate } = require('celebrate');

const {
  getTodos,
  postTodo,
  putDone,
  deleteDone,
  patchTodo,
  deleteTodo,
  getTodoById
} = require('../controllers/todo');

router.get('/', getTodos);

router.get('/:id',getTodoById);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      caption: Joi.string().min(2).max(128).required(),
      description: Joi.string().max(512),
      expires: Joi.date().required(),
      isFinished: Joi.boolean(),
      fileList: Joi.array().items(Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/)),
    }),
  }),
  postTodo
);

router.put(
  '/done/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
  }),
  putDone
);

router.delete(
  '/done/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteDone
);

router.patch(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
    body: Joi.object().keys({
      _id: Joi.string().length(24).hex(),
      caption: Joi.string().min(2).max(128).required(),
      description: Joi.string(),
      expires: Joi.date().required(),
      isFinished: Joi.boolean(),
      fileList: Joi.array().items(Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/)).allow(''),
    }),
  }),
  patchTodo
);

router.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteTodo
);

module.exports = router;