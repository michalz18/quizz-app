import React, { useState } from 'react';
import QuizModal from './QuizModal';
import quizzes from './exampleData';

function Quizzes() {
    // const [quizzes] = props;
const quizArr = quizzes;

    const [selestedQuiz, setSelectedQuiz] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quizzesVisible , setQuizzesVisible] = useState(true)


    function handleClick(quiz) {
        setSelectedQuiz(quiz);
        setIsModalOpen(true);
        console.log(isModalOpen)
        setQuizzesVisible(false)
    }

    function handleCloseModal(){
        setIsModalOpen(false);
    }

    function setVisible(flag){
        setQuizzesVisible(flag)
        setSelectedQuiz(null)
    }
 
    return (
        <div>
            {quizzesVisible && quizArr.map((quiz, index) => (
                <button onClick={() => handleClick(quiz)} key={index}>{quiz.title}</button>
            ))}
            
            {selestedQuiz && (
                <QuizModal quiz={selestedQuiz} isModalOpen={isModalOpen} onClose={handleCloseModal} setVisible={setVisible}></QuizModal>
            )}
        </div>
    )
}

export default Quizzes