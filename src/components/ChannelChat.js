import React from "react";
import { useEffect, useState, useRef } from "react";
import { getHeaders } from "./Utils";
import Modal from "./Modal/Modal";
import ChannelMessages from "./ChannelMessages";
import { computeHeadingLevel } from "@testing-library/dom";


const ChannelChat = (props) => {
    const {channelId, channelName, setChatWindow, counter, setCounter} = props; 
    const [messages, setMessages] = useState({});
    const [chatInput, setChatInput] = useState('');
    const [channelMessages, setChannelMessages] = useState([]);
    const ref = useRef();
    const headers = getHeaders();

    useEffect(() => {
        getChannelMessages(channelId, headers);
        console.log(counter);
        const timer = setTimeout(() => {
            setCounter(counter + 1);
            getChannelMessages(channelId, headers);
        }, 2000);

        return () => {
            clearTimeout(timer);
        }
    }, [channelId, counter]);

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
                const messages = data.data;
                setChannelMessages(() => messages);
                ref.current.scrollIntoView({ behavior: "smooth" });
            })
    } 

    const [show, setShow] = useState(false);
    
    const sendMessage = ({message, channelId, headers}) => {

        const options = {
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
                receiver_id: channelId, 
                receiver_class: "Channel",
                body: message 
            })
        }

        // Send message
        const url = `${process.env.REACT_APP_SLACK_ENDPOINT}/messages`;

        fetch(url, options) 
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);
                if(!data.errors) {
                    getChannelMessages(channelId, headers);
                }
            });
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
    
    const addMember = (e) => {
        console.log('Add member');
        e.preventDefault();
        setChatWindow('add-member');
    }


    return (
        <section id="channel-chat">
            <div id="channel-header">
                <div className="container header">
                    <h1><i className='bx bx-hash'></i>{channelName}</h1>
                    <div className="channel-options">
                        <a href="#" className="channel-btn" onClick={addMember}>+ Add member</a> 
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

                <ChannelMessages channelMessages={channelMessages} />

                <div ref={ref}></div>
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
