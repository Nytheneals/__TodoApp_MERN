const express = require("express");
const mongoose = require("mongoose");

// Creating the Schema
const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name cannot be blank"
  },
  completed: {
    type: Boolean,
    default: false
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

// Compiling our Model
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
