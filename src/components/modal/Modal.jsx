import './Modal.css';
import PropTypes from 'prop-types';

function ModalAction({message, onCancel, onConfirm}) {
    return (
        <div className='modal-container'>
            <div className='modal'>
                <p>{message}</p>
                <div className='modal-buttons'>
                    <button onClick={onConfirm}>Yes</button>
                    <button onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    )
}

ModalAction.propTypes = {
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
};

export default ModalAction;