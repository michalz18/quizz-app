import React, { useState, useEffect } from 'react';
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';

function QuizModal(props) {
    const { quiz, onClose, setVisible } = props;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(0);
    const [score, setScore] = useState(0);

    function handleNextQuestion() {
        setScore(isCorrectAnswer)
        setCurrentQuestionIndex(currentQuestionIndex + 1)

    }

    function checkAnswer(answer) {
        setIsCorrectAnswer(answer.isCorrect ? 1 : 0)
    }


    function getFinalScore() {
        if (isCorrectAnswer) {
            setScore(score + 1);
        }
        setVisible(true);
    }

    useEffect(() => {
        console.log(score);
    }, [score]);


    return (
        <PureModal
            header={`Quiz: ${quiz.title}`}
            footer={
                currentQuestionIndex === quiz.questions.length - 1
                && <button onClick={getFinalScore}>Close</button>
            }
            onClose={onClose}
            isOpen
        >

            {quiz.questions.map((question, index) => (
                index === currentQuestionIndex && (
                    <div key={index}>
                        <h2>{question.question}</h2>
                        <div>
                            {question.answers.map((answer, answerIndex) => (
                                <button key={answerIndex} onClick={() => checkAnswer(answer)}>{answer.question}</button>
                            ))}
                        </div>
                        {currentQuestionIndex < quiz.questions.length - 1 && <button onClick={handleNextQuestion}>Next</button>}
                    </div>
                )
            ))}

        </PureModal>
    );
}

export default QuizModal;