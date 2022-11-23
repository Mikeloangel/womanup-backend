// all routes are /
// GET - returns all todos
// POST - posts a new todo in body, returns new todo
// PUT - puts done status expected id in body
// PATCH - updates todo by any field returns updated todo
// DELETE - deletes todo by id passed in body

const router = require('express').Router();

// const { Joi, celebrate } = require('celebrate');

const {
  getTodos,
  postTodo,
  putDone,
  deleteDone,
  patchTodo,
  deleteTodo
} = require('../controllers/todo');

router.get('/', getTodos);
router.post('/', postTodo);
router.put('/done/:id', putDone);
router.delete('/done/:id', deleteDone);
router.patch('/:id', patchTodo);
router.delete('/:id', deleteTodo);

module.exports = router;