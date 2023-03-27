import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import './Score.css'
function Score(props) {

    const { score, closeSummary, maxPoints, CURRENT_QUIZ_ID, loggedUser } = props
console.log(loggedUser)
  
    const submitScore = async () => {
        const response = await fetch("http://localhost:8080/quizzes/history", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ score: score, maxPoints: maxPoints, CURRENT_QUIZ_ID: CURRENT_QUIZ_ID, loggedUser:loggedUser })
        })
        if (!response.ok) {
            throw Error("Response is not Ok!")
        }
        closeSummary(false)
    }



    return (
        <div className='container'>
            <PureModal


                isOpen
            >
                <div className="modal-content">
                    <div className="score-circle">
                        <h2>Your score: {score} / {maxPoints}</h2>
                        <button onClick={submitScore}>Hurrah</button>
                    </div>
                </div>
            </PureModal>
        </div>
    )



}
export default Score;