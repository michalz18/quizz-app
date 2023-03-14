import React, { useState } from 'react';
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';

function QuizModal(props) {
    const { quiz, setVisible } = props;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState([]);
    function handleNextQuestion() {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    function checkAnswer(answer) {
        setScore(score.concat(answer.isCorrect))
        console.log(score)
    }

    function getFinalScore() {
        setVisible(true)
        const resoult = score.filter(el => el === true)
        console.log(resoult.length)
    }
    return (
        <div>
            {quiz.questions.map((question, index) => (
                index === currentQuestionIndex && (
                    <div key={index}>
                        <h2>{question.question}</h2>
                        <div>
                            {question.answers.map((answer, answerIndex) => (
                                <button key={answerIndex} onClick={() => checkAnswer(answer)}>{answer.question}</button>
                            ))}
                        </div>
                        {currentQuestionIndex < quiz.questions.length - 1
                            ? <button onClick={handleNextQuestion}>Next</button> : <button onClick={() => { getFinalScore() }}>Close</button>}
                    </div>
                )
            ))}
        </div>
    );
}

export default QuizModal;