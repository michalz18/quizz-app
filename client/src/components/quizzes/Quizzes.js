import React, { useEffect, useState } from 'react';
import QuizModal from './QuizModal';
import './Quizzes.css'

function Quizzes(props) {
   
    const [selestedQuiz, setSelectedQuiz] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quizzesVisible, setQuizzesVisible] = useState(true)
    const [quizzes, setQuizzes] = useState([])

    const getQuizzes = async () => {
        const response = await fetch('http://localhost:8080/quizzes')
        if (!response.ok) {
            throw Error('Failed to deleated todo item!')
        }
        const data = await response.json()
        setQuizzes(data)
        console.log(data)
    }

    useEffect(() => {
        getQuizzes()
    }, [])

    console.log(quizzes)

    function handleClick(quiz) { //zmienić nazwę funkcji na funkcjonalnność jaką wykonuje
        setSelectedQuiz(quiz);
        setIsModalOpen(true);
        console.log(isModalOpen)
        setQuizzesVisible(false)
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    function setVisible(flag) {
        setQuizzesVisible(flag)
        setSelectedQuiz(null)
    }

    return (
        <div className='button-container'>
            {quizzesVisible && quizzes && quizzes.map((quiz, index) => (
                <button onClick={() => handleClick(quiz)} key={index}>{quiz.title}</button>
            ))}

            {selestedQuiz && (
                <QuizModal  quiz={selestedQuiz} isModalOpen={isModalOpen} onClose={handleCloseModal} setVisible={setVisible}></QuizModal>
            )}
        </div>
    )
}

export default Quizzes