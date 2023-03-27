import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import './Score.css'
function Score(props) {

    const { score, closeSummary, maxPoints } = props

    return (
        <div className='container'>
            <PureModal
           
                
                isOpen
            >
                <div className="modal-content">
                    <div className="score-circle">
                        <h2>Your score: {score} / {maxPoints}</h2>
                        <button onClick={() => closeSummary(false)}>Hurrah</button>
                    </div>
                </div>
            </PureModal>
        </div>
    )



}
export default Score;