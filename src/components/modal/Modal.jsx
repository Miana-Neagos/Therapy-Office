import './Modal.css';
import PropTypes from 'prop-types';

function ModalAction({message, onCancel, onConfirm, error}) {
    const msgCheck = message => message=== 'Appointment deleted successfully.' || message === 'Appointment added successfully.';

    return (
        <div className='modal-container'>
            <div className='modal'>
                <p>{message}</p>
                <div className='modal-buttons'>
                        <button onClick={msgCheck(message) ? onCancel : onConfirm}>
                            {msgCheck(message) ? 'Ok' : (error ? 'Ok' : 'Yes')}
                        </button>

                        {!msgCheck(message) && <button onClick={onCancel}>No</button>}
                </div>
            </div>
        </div>
    )
}

ModalAction.propTypes = {
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    error: PropTypes.bool,
};

export default ModalAction;