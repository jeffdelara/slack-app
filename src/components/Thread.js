import React from "react";

const Thread = (props) => {
    // setIsThreadOpen(true or false) it will show or hide thread section
    const { setIsThreadOpen } = props;

    return (
        <section id="thread">
            <div id="thread-header">
                <div className="container header">
                    <h1>Thread</h1>
                    <i className='bx bx-x'></i>
                </div>
            </div>

            <div className="channel-message">
                <div className="sender-pic"><img src="https://ca.slack-edge.com/T010DU0GZE0-U01CNLJ3J0P-46af7649e68b-512" alt="" /></div>
                <div className="sender">
                    <div className="sender-name">Maurus Vitor <span className="created">8:01 PM</span></div>
                    <div className="sender-message">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, enim quis! Dolorum ut neque aliquam atque. Dolores dolorem, similique consectetur necessitatibus ut libero quis ipsam alias. Voluptate error ipsam perferendis.</div>
                </div>
            </div>

            <div className="thread-divider">
                <span className="thread-content">Tuesday, November 9th</span>
            </div>

            <div className="channel-message">
                <div className="sender-pic"><img src="https://ca.slack-edge.com/T010DU0GZE0-U02C42FABUK-8daed97695af-512" alt="" /></div>
                <div className="sender">
                    <div className="sender-name">Jeff de Lara <span className="created">8:01 PM</span></div>
                    <div className="sender-message">Good evening! Don't forget to post your standup.</div>
                </div>
            </div>


            <div id="thread-chat-input">
                <div className="container">
                    <textarea name="" id="" placeholder="Reply"></textarea>
                </div>
            </div>
        </section>
    )
}

export default Thread;
