import React from "react"
import "./Home.css"
import img from "./home.jpg"

export default function Home({ goToQuizes }) {
	return (
		<div className='Home'>
			<div>
				<h2>Test your trivia with QuizApp</h2>
			</div>
			<img className='HomeImg' src={img} alt='' />
			<div className="HomeText">
				<p>Boost your brainpower with our quizzes</p>
			</div>
			<button className="HomeButton" onClick={goToQuizes}>Start solving</button>
		</div>
	)
}
