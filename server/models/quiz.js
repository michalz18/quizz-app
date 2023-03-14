const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const quizSchema = new Schema({
  title: String,
  questions: Array
});

module.exports = model("quiz", quizSchema);