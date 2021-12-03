import React from "react";

import './Modal.css';

const AddMember = props => {
    if (!props.show) {
        return null
    }

    return (
        <div className="modal">
        <div className="modal-content">
            <div class="modal-header">
                <h4 className="modal-title">ADD MEMBER</h4>
            </div>
            <div className="modal-body">
                NAME: <input type="text" name="username" value="" />
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" type="submit">Save changes</button>
            </div>
        </div>
    </div>
    )
}

export default AddMember