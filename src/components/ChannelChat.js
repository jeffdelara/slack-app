import React from "react";
import { useEffect, useState } from "react";
import { getHeaders } from "./Utils";
import Modal from "./Modal/Modal";


const ChannelChat = (props) => {
    const {channelId, channelName} = props; 
    const [messages, setMessages] = useState({});
    const [chatInput, setChatInput] = useState('');
    const headers = getHeaders();

    useEffect(() => {
        getChannelMessages(channelId, headers);
    }, [channelId]);

    const getChannelMessages = (channelId, headers) => {
        const options = {
            method: 'GET', 
            mode: 'cors',
            headers: {
                'access-token' : headers.accessToken,  
                'client' : headers.client, 
                'expiry' : headers.expiry, 
                'uid' : headers.uid
            }
        }

        const url = `${process.env.REACT_APP_SLACK_ENDPOINT}/messages?receiver_id=${channelId}&receiver_class=Channel`;
        fetch(url, options)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data)
            })
    } 

    const [show, setShow] = useState(false);

    
    const sendMessage = ({message, channelId, headers}) => {

        const chatChannel = {
            method: 'POST', 
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json', 
                'access-token' : headers.accessToken, 
                'client' : headers.client, 
                'expiry' : headers.expiry, 
                'uid' : headers.uid
            },
            body: JSON.stringify({
                channel_id: channelId, 
                body: message 
            })
        }
    }

    const typingChat = (e) => {
        e.preventDefault();
        setChatInput(e.target.value);
    }

    const handleEnter = (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            console.log(chatInput);
            const message = e.target.value;
            // send message
            sendMessage({message, channelId, headers});

            e.target.value = '';
            setChatInput('');
        }
    }


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
                    <h1><i className='bx bx-hash'></i>{channelName}</h1>
                    <div className="channel-options">
                        <a href="#" className="channel-btn" >+ Add member</a>
                        
        

                        <div id="channel-members">
                        <button onClick={() => setShow(true) }>
                            <img src="https://a.slack-edge.com/d4111/img/apps/workflows_192.png" alt="" />
                            <img src="https://ca.slack-edge.com/T010DU0GZE0-U02C42FABUK-8daed97695af-512" alt="" />
                            <img src="https://ca.slack-edge.com/T010DU0GZE0-U01CNLJ3J0P-46af7649e68b-512" alt="" />
                        </button>
                            <span className="muted"><Modal onClose={() => setShow(false)} show={show} /></span>
                        </div>
                    </div>
                </div>
            </div>

            <div id="channel-chat-content">
                <div className="channel-message">
                    <div className="sender-pic"><img src="https://a.slack-edge.com/d4111/img/apps/workflows_192.png" alt="" /></div>
                    <div className="sender">
                        <div className="sender-name">Team Standup B13 <span className="created">8:01 PM</span></div>
                        <div className="sender-message">NO TEXT</div>
                        
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
                        <div className="sender-message">NO TEXT</div>

                    </div>
                </div>
            </div>

            <div id="channel-chat-input">
                <div className="container">
                    <textarea name="" id=""onChange={typingChat} onKeyPress={handleEnter} placeholder="Message #announcement">{chatInput}</textarea>
                </div>
            </div>
        </section>
    )
}



export default ChannelChat;
