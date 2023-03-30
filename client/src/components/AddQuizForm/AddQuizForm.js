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

		if (!quizName) return

		const response = await fetch("http://localhost:8080/quiz-add", {
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
		<div>
			<div className='Text'>
				<p>
					This is where you can add yours quiz to the app. Remember to add a
					title for the quiz and at least one question. You can add two, three,
					or four answers to each question. Only one answer should be correct -
					select it by placing a check in an appropriate box.
				</p>
			</div>
			<form onSubmit={handleSubmit}>
				<div>
					Quiz Name:
					<input
						className='form-control'
						placeholder='type quiz name'
						type='text'
						value={quizName}
						onChange={handleQuizNameChange}
					/>
				</div>

				{questions.map((question, questionIndex) => (
					<div key={questionIndex}>
						<div>
							Question:
							<input
								className='form-control'
								placeholder='type question'
								type='text'
								name='question'
								value={question.question}
								onChange={event => handleQuestionChange(event, questionIndex)}
							/>
						</div>
						<div>
							Answers:
							{question.answers.map((answer, answerIndex) => (
								<div className='input-group mb-3' key={answerIndex}>
									<input
										className='form-control'
										aria-label='Text input with checkbox'
										placeholder='type answer'
										type='text'
										name='answer'
										value={answer.answer}
										onChange={event =>
											handleAnswerChange(event, questionIndex, answerIndex)
										}
									/>
									<div className='input-group-text'>
										<input
											className='form-check-input mt-0'
											value=''
											aria-label='Checkbox for following text input'
											type='checkbox'
											checked={answer.isCorrect}
											onChange={event =>
												handleCheckboxChange(event, questionIndex, answerIndex)
											}
										/>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
				<div>
					<button
						className='btn btn-warning'
						type='button'
						onClick={handleAddQuestion}>
						Add Another Question
					</button>
				</div>
				<div>
					<button className='btn btn-warning' type='submit'>
						Save and Close Form
					</button>
				</div>
			</form>
		</div>
	)
}

export default AddQuizForm
