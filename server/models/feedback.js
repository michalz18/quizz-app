const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const feedbackSchema = new Schema({
  user: String,
  feedbackText: String,
  feedbackRate: String
});

const Feedback = model("Feedback", feedbackSchema);

module.exports = Feedback;