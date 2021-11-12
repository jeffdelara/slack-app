import React from "react";

const DirectMessage = (props) => {
    return (
        <section id="channel-chat">
            <div id="channel-header">
                <div className="container header">
                    <h1><img src="https://a.slack-edge.com/d4111/img/apps/workflows_192.png" alt="" /> Slackbot</h1>
                </div>
            </div>

            <div id="channel-chat-content">
                <div className="channel-message">
                    <div className="sender-pic"><img src="https://a.slack-edge.com/d4111/img/apps/workflows_192.png" alt="" /></div>
                    <div className="sender">
                        <div className="sender-name">Team Standup B13 <span className="created">8:01 PM</span></div>
                        <div className="sender-message">Good evening! Don't forget to post your standup.</div>
                        
                    </div>
                </div>

                <div className="channel-message">
                    <div className="sender-pic"><img src="https://ca.slack-edge.com/T010DU0GZE0-U02C42FABUK-8daed97695af-512" alt="" /></div>
                    <div className="sender">
                        <div className="sender-name">Jeff de Lara <span className="created">8:01 PM</span></div>
                        <div className="sender-message">Good evening! Don't forget to post your standup.</div>

                    </div>
                </div>
            </div>

            <div id="channel-chat-input">
                <div className="container">
                    <textarea name="" id="" placeholder="Message #announcement"></textarea>
                </div>
            </div>
        </section>
    )
}

export default DirectMessage;
