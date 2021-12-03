import React from 'react' 
import AddMember from './AddMember';

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
                    <li>SEAN DELA CRUZ</li>
                    <li>JEFF DE LARA</li>
                    <li>MAURUS VITOR</li>
                </div>
                <div className="modal-footer">
                    <button onClick={props.onClose} className="button">Close</button>
                    <button onClick={AddMember} >AddMember</button>
                 
    
                </div>
            </div>
        </div>
    )
}

export default Modal 