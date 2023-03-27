import React, { useState } from "react"
// to delete
function AddQuizForm() {
	const [quizName, setQuizName] = useState("")
	const [questions, setQuestions] = useState([
		{
			question: "",
			answers: [
				{ answer: "", isCorrect: false },
				{ answer: "", isCorrect: false },
				{ answer: "", isCorrect: false },
				{ answer: "", isCorrect: false },
			],
		},
	])

	const handleQuizNameChange = event => {
		setQuizName(event.target.value)
	}

	const handleQuestionChange = (event, index) => {
		const { name, value } = event.target
		const updatedQuestions = [...questions]
		updatedQuestions[index][name] = value
		setQuestions(updatedQuestions)
	}

	const handleAnswerChange = (event, questionIndex, answerIndex) => {
		const { name, value } = event.target
		const updatedQuestions = [...questions]
		updatedQuestions[questionIndex].answers[answerIndex][name] = value
		setQuestions(updatedQuestions)
	}

	const handleCheckboxChange = (event, questionIndex, answerIndex) => {
		const updatedQuestions = [...questions]
		updatedQuestions[questionIndex].answers.forEach((answer, index) => {
			if (index === answerIndex) {
				answer.isCorrect = event.target.checked
			} else {
				answer.isCorrect = false
			}
		})
		setQuestions(updatedQuestions)
	}

	const handleAddQuestion = () => {
		setQuestions([
			...questions,
			{
				question: "",
				answers: [
					{ answer: "", isCorrect: false },
					{ answer: "", isCorrect: false },
					{ answer: "", isCorrect: false },
					{ answer: "", isCorrect: false },
				],
			},
		])
	}

	const handleSubmit = async event => {
		event.preventDefault()
		const response = await fetch("http://localhost:8080/quizz", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				title: quizName,
				questions: questions,
			}),
		})

		if (response.ok) {
			setQuizName("")
			setQuestions([
				{
					question: "",
					answers: [
						{ answer: "", isCorrect: false },
						{ answer: "", isCorrect: false },
						{ answer: "", isCorrect: false },
						{ answer: "", isCorrect: false },
					],
				},
			])
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Quiz Name:
				<input type='text' value={quizName} onChange={handleQuizNameChange} />
			</label>
			{questions.map((question, questionIndex) => (
				<div key={questionIndex}>
					<label>
						Question:
						<input
							type='text'
							name='question'
							value={question.question}
							onChange={event => handleQuestionChange(event, questionIndex)}
						/>
					</label>
					{question.answers.map((answer, answerIndex) => (
						<div key={answerIndex}>
							<label>
								Answer:
								<input
									type='text'
									name='answer'
									value={answer.answer}
									onChange={event =>
										handleAnswerChange(event, questionIndex, answerIndex)
									}
								/>
							</label>
							<label>
								Correct:
								<input
									type='checkbox'
									checked={answer.isCorrect}
									onChange={event =>
										handleCheckboxChange(event, questionIndex, answerIndex)
									}
								/>
							</label>
						</div>
					))}
				</div>
			))}
			<button type='button' onClick={handleAddQuestion}>
				Add Another Question
			</button>
			<button type='submit'>Save and Close Form</button>
		</form>
	)
}

export default AddQuizForm
