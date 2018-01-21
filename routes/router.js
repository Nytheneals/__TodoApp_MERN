const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Todo = require('../models/todoSchema');
const controller = require('../controllers/controller');

const router = express.Router();

router.get('/todos', controller.getTodos); // LIST ALL TODOS
router.post('/todos', controller.createTodo); // CREATING A TODO
router.get('/todos/:id', controller.getTodo); // RETRIEVE A TODO
router.put('/todos/:id', controller.updateTodo); // UPDATING A TODO
router.delete('/todos/:id', controller.deleteTodo); // DELETING A TODO
module.exports = router;
