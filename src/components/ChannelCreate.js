import React from "react";

const ChannelCreate = (props) => {
    return (
        <section id="channel-chat">
            <div id="channel-header">
                <div className="container header">
                    <h1><i className='bx bx-hash'></i> Create channel</h1>

                </div>
            </div>

            <div id="channel-chat-content">
                <div className="container">
                    <div className="muted">Type the name of new channel</div>
                    <input type="text" className="textbox" placeholder="Channel name" />
                </div>
            </div>
        </section>
    )
}

export default ChannelCreate;
