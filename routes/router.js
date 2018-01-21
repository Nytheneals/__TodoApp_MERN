const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Todo = require('../models/todoSchema');

const router = express.Router();
// LIST ALL TODOS
router.get('/todos', (req, res, next) => {
  Todo.find().then((todo) => {
    res.json(todo);
  });
});

// CREATING A TODO
router.post('/todos', (req, res, next) => {
  Todo.create(req.body).then((todo) => {
    res.send(todo);
  });
});

// RETRIEVE A TODO
router.get('/todos/:id', (req, res, next) => {
  Todo.findById({ _id: req.params.id }).then((todo) => {
    res.json(todo);
  });
});

// UPDATING A TODO
router.put('/todos/:id', (req, res, next) => {
  Todo.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).then((todo) => {
    res.json(todo);
  });
});

// DELETING A TODO
router.delete('/todos/:id', (req, res, next) => {
  Todo.findByIdAndRemove({ _id: req.params.id }).then((todo) => {
    res.json(todo);
  });
});

module.exports = router;
