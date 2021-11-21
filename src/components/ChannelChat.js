import React from "react";
import { getHeaders } from "./Utils";

const ChannelChat = (props) => {
    const {channelId, channelName} = props; 

    // channelId is the id
    console.log(channelId);
    // channelName is the name of the channel
    console.log(channelName);

    // HINT:
    // Retrieve all messages using Slack API
    // Referece: https://slack-avion.netlify.app/
    // HTTP Method: Get
    // URL: {process.env.REACT_APP_SLACK_ENDPOINT}/messages?receiver_id=${receiverId}&receiver_class=Channel
    // Where receiver_id is the channelId declared above
    // use getHeaders() to get the headers needed for the fetch request
    // Display the data on the channel window


    return (
        <section id="channel-chat">
            <div id="channel-header">
                <div className="container header">
                    <h1><i className='bx bx-hash'></i> Announcement</h1>
                    <div className="channel-options">
                        <a href="#" className="channel-btn">+ Add member</a> 

                        <div id="channel-members">
                            <img src="https://a.slack-edge.com/d4111/img/apps/workflows_192.png" alt="" />
                            <img src="https://ca.slack-edge.com/T010DU0GZE0-U02C42FABUK-8daed97695af-512" alt="" />
                            <img src="https://ca.slack-edge.com/T010DU0GZE0-U01CNLJ3J0P-46af7649e68b-512" alt="" />
                            <span className="muted">17</span>
                        </div>
                    </div>
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
                    <div className="sender-pic"><img src="https://ca.slack-edge.com/T010DU0GZE0-U01CNLJ3J0P-46af7649e68b-512" alt="" /></div>
                    <div className="sender">
                        <div className="sender-name">Maurus Vitor <span className="created">8:01 PM</span></div>
                        <div className="sender-message">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, enim quis! Dolorum ut neque aliquam atque. Dolores dolorem, similique consectetur necessitatibus ut libero quis ipsam alias. Voluptate error ipsam perferendis.</div>
                        <div className="message-replies">
                            <img src="https://ca.slack-edge.com/T010DU0GZE0-U01CNLJ3J0P-46af7649e68b-512" alt="" />
                            <img src="https://ca.slack-edge.com/T010DU0GZE0-U02C42FABUK-8daed97695af-512" alt="" />
                            <span><a href="">2 replies</a></span>
                            <span className="muted date">Last reply 2 days ago.</span>
                        </div>
                    </div>
                </div>

                <div className="date-divider">
                    <span className="divider-content">Tuesday, November 9th</span>
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

export default ChannelChat;
