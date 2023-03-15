import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';

function Score(props) {

    const { score, onClose, closeSummary } = props

    return (
        <div>
            <PureModal
            
                header={`Your score: ${score} /10`}
                footer={
                    <button onClick={() => closeSummary(false)}>Hurrah</button>
                }
                isOpen
            >
            </PureModal>
        </div>
    )



}
export default Score;