import React, { useState, useEffect } from 'react';
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import './QuizModal.css';
import Score from './Score';

function QuizModal(props) {
    const { quiz, setVisible } = props;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState([]);
    const [disableBtn, setDisableBtn] = useState(true)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1);
    const [showScore, setShowScore] = useState(false)
    const [points, setPoints] = useState(0);
    const CURRENT_QUIZ_ID = quiz._id;
    const [timeLeft, setTimeLeft] = useState(10);
    

    useEffect(() => {
        setTimeLeft(10);
      }, [currentQuestionIndex]);


      let timer = null
      useEffect(() => {
         timer  = setInterval(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
      
        if (timeLeft === 0) {
            triggerAnswer()
            clearInterval(timer);
           
        }
      
        return () => clearInterval(timer);
      }, [timeLeft]);

      function triggerAnswer (){
        setDisableBtn(!disableBtn)
        setSelectedAnswerIndex(-1)

      }

    const progress = [...Array(quiz.questions.length).keys()];
    const maxPoints = progress.length
    console.log(progress.length)

    function handleNextQuestion() {
        setTimeLeft(10);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setDisableBtn(!disableBtn)
        setSelectedAnswerIndex(-1)
    }

    function checkAnswer(answer, answerIndex) {
        clearInterval(timer);
        setDisableBtn(!disableBtn)
        setSelectedAnswerIndex(answerIndex);
        answer.isCorrect && timeLeft > 0 ?  setScore(score.concat(true)) : setScore(score.concat(false));
    }


    function getFinalScore() {
        setShowScore(true)
        const resoult = score.filter(el => el === true)
        setPoints(resoult.length)
    }

    function handleCloseScore() {
        setShowScore(false)
    }

    function closeSummary(flag) {
        setShowScore(flag)
        setVisible(true)
    }


    
    return (
        <div className='question-container'>
            {quiz.questions.map((question, index) => (
                index === currentQuestionIndex && (
                    <div key={index}>
                        <h2>{question.question}</h2>
                        <div className='question'>
                            {question.answers.map((answer, answerIndex) => (
                                <button className={
                                    selectedAnswerIndex === answerIndex ? answer.isCorrect ? 'correct' : 'incorrect' : (answer.isCorrect ? 'correct' : '')
                                } key={answerIndex} onClick={() => checkAnswer(answer, answerIndex)} disabled={!disableBtn} >{answer.answer}</button>

                            ))}
                             <div>Time left: {timeLeft}</div>
                        </div>
                        {currentQuestionIndex < quiz.questions.length - 1
                            ? (
                                <>
                                    <button className='next-btn' onClick={handleNextQuestion} disabled={disableBtn}>Next</button>
                                    <div>
                                    {progress.map((p, i) => (
                                        <button key={i} className="progress-btn" disabled={i > currentQuestionIndex}>{p + 1}</button>
                                    ))}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <button className='close-btn' onClick={() => { getFinalScore() }} disabled={disableBtn}>Close</button>
                                    <div>
                                    {progress.map((p, i) => (
                                        
                                        <button key={i} className="progress-btn" disabled={i > currentQuestionIndex}>{p + 1}</button>
                                    ))}
                                    </div>
                                </>
                            )
                        }
                    </div>
                )
            ))}
            {showScore && (
                <Score  CURRENT_QUIZ_ID={CURRENT_QUIZ_ID}  score={points} onClose={handleCloseScore} setVisible={setVisible} isOpen={showScore} closeSummary={closeSummary} maxPoints={maxPoints} />
            )}
        </div>
    );
}   

export default QuizModal;