import React from 'react' 
import Users from './Users'


import './Modal.css';

const Modal = props => {

    if (!props.show) {
        return null
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div class="modal-header">
                    <h4 className="modal-title">USERS</h4>
                </div>
                <div className="modal-body">
                    <li><Users /></li>
                  
                </div>
                <div className="modal-footer">
                    <button onClick={props.onClose} className="button">Close</button>
                 
    
                </div>
            </div>
        </div>
    )
}

export default Modal 