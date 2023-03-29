const mongoose = require("mongoose")
const { Schema, model } = mongoose

const quizSchema = new Schema({
	title: String,
	questions: [
		{
			question: String,
			answers: [{ answer: String, isCorrect: Boolean }],
		},
	],
})

const Quiz = model("Quiz", quizSchema)
module.exports = Quiz
