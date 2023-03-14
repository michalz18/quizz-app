const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const quizSchema = new Schema({
  title: String,
  questions: Array
});

const Quiz = model("Quiz", quizSchema)
module.exports = Quiz;