import React from "react";

const Sidebar = (props) => {
    // setChatWindow choices: 'chat', 'create-chat', 'dm'
    const {setChatWindow} = props;
    return (
        <section id="sidebar">
            <div id="side-header">
                <div className="container header">
                    <h1>Avion School</h1>
                    <a href="#"><i className='bx bx-message-square-edit' id="side-create-message"></i></a>
                </div>
            </div>

            <div className="container">
                <div id="side-channel-list">
                    <a href="#">Channels</a>
                    <ul>
                        <li><i className='bx bx-hash'></i> announcement</li>
                        <li><i className='bx bx-hash'></i> coding</li>
                        <li><i className='bx bx-hash'></i> mentoring</li>
                        <li><a href="#"><i className='bx bxs-plus-square' ></i> Create channels</a></li>
                    </ul>
                </div>

                <div id="side-direct-messages" className="mt-2">
                    <a href="#">Direct messages</a>
                    <ul>
                        <li className="dm-item"><img src="https://a.slack-edge.com/d4111/img/apps/workflows_192.png" alt="" /> Slackbot</li>
                        <li className="dm-item"><img src="https://ca.slack-edge.com/T010DU0GZE0-U02C42FABUK-8daed97695af-512" alt="" /> Jeffrey de Lara</li>
                        <li className="dm-item"><img src="https://ca.slack-edge.com/T010DU0GZE0-U01CNLJ3J0P-46af7649e68b-512" alt="" /> Maurus Vitor</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Sidebar;
