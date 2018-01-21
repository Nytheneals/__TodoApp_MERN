const express = require("express");
const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect("mongodb://nythes:4878wert@ds257627.mlab.com:57627/todo_colt");
mongoose.Promise = promise;
// Creating the Schema

const TodoSchema = new Schema({
  name: {
    type: String,
    required: [true, "Add Something"]
  },
  completed: { type: Boolean, default: false },
  createdDate: {
    type: Date,
    default: Date.Now
  }
});

mongoose.model = ("Todo", TodoSchema);
