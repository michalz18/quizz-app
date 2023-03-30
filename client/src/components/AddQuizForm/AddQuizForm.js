import React, { useState } from "react"
import PureModal from "react-pure-modal"
import "./AddQuizForm.css"
function AddQuizForm() {
	const [quizName, setQuizName] = useState("")
	const [modalVisible, setModalVisible] = useState(false)
	const [modalContent, setModalContent] = useState("")
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
			setModalContent("Your quiz successfully added!")
			setModalVisible(true)
		}
	}

	const closeModal = () => {
		setModalVisible(false)
		setModalContent("")
	}

	return (
		<div>
			<div className='text'>
				<p>
					This is where you can add yours quiz to the app. Remember to add a
					title for the quiz and at least one question. You can add two, three,
					or four answers to each question. Only one answer should be correct -
					select it by placing a check in an appropriate box.
				</p>
			</div>
			<form onSubmit={handleSubmit}>
				<div className='title'>Quiz Name:</div>
				<div>
					<input
						className='form-control quiz-name'
						placeholder='type quiz name'
						type='text'
						value={quizName}
						onChange={handleQuizNameChange}
					/>
				</div>

				{questions.map((question, questionIndex) => (
					<div key={questionIndex}>
						<div className='title'>Question:</div>
						<div>
							<input
								className='form-control quiz-question'
								placeholder='type question'
								type='text'
								name='question'
								value={question.question}
								onChange={event => handleQuestionChange(event, questionIndex)}
							/>
						</div>
						<div className='title'>
							Answers:
							{question.answers.map((answer, answerIndex) => (
								<div className='input-group mb-3 container' key={answerIndex}>
									<input
										className='form-control answer-input'
										aria-label='Text input with checkbox'
										placeholder='type answer'
										type='text'
										name='answer'
										value={answer.answer}
										onChange={event =>
											handleAnswerChange(event, questionIndex, answerIndex)
										}
									/>
									<input
										className='form-check-input mt-0 checkbox-input'
										value=''
										aria-label='Checkbox for following text input'
										type='checkbox'
										checked={answer.isCorrect}
										onChange={event =>
											handleCheckboxChange(event, questionIndex, answerIndex)
										}
									/>
								</div>
							))}
						</div>
					</div>
				))}
				<div>
					<button className='btn' type='button' onClick={handleAddQuestion}>
						Add Another Question
					</button>
				</div>
				<div>
					<button className='btn' type='submit'>
						Save and Close Form
					</button>
				</div>
			</form>
			<PureModal
				isOpen={modalVisible}
				onClose={closeModal}
				className='my-modal'>
				{modalContent}
			</PureModal>
		</div>
	)
}

export default AddQuizForm
