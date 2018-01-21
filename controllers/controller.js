const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Todo = require('../models/todoSchema');

// LIST ALL TODOS
exports.getTodos = (req, res, next) => {
  Todo.find().then((todo) => {
    res.json(todo);
  });
};
// CREATING A TODO
exports.createTodo = (req, res, next) => {
  Todo.create(req.body).then((todo) => {
    res.send(todo);
  });
};

// RETRIEVE A TODO
exports.getTodo = (req, res, next) => {
  Todo.findById({ _id: req.params.id }).then((todo) => {
    res.json(todo);
  });
};
// UPDATING A TODO
exports.updateTodo = (req, res, next) => {
  Todo.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).then((todo) => {
    res.json(todo);
  });
};

// DELETING A TODO
exports.deleteTodo = (req, res, next) => {
  Todo.findByIdAndRemove({ _id: req.params.id }).then((todo) => {
    res.json(todo);
  });
};
