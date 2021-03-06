import React, {useState, useEffect, useRef} from "react";
import { getHeaders } from "./Utils";

const DirectMessage = (props) => {
    // channelId is also the receiver_id to be used for fetching API
    const {channelId, channelName, counter, setCounter} = props;
    const receiverId = channelId;
    const receiverName = channelName;
    const [messages, setMessages] = useState({});
    const [chatInput, setChatInput] = useState('');
    const headers = getHeaders();
    const ref = useRef();

    useEffect(() => {
        getUserMessages(receiverId, headers);
        console.log(counter);
        const timer = setTimeout(() => {
            setCounter(counter + 1);
            getUserMessages(receiverId, headers);
        }, 3000);

        return () => {
            clearTimeout(timer);
        }
    }, [receiverId, counter]);

    const getUserMessages = (receiverId, headers) => {
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

        const url = `${process.env.REACT_APP_SLACK_ENDPOINT}/messages?receiver_id=${receiverId}&receiver_class=User`;
        fetch(url, options)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const dm = data.data; 
                const filteredMessages = {};

                for(const item of dm) {
                    filteredMessages[item.id] = {
                        sender: item.sender.email, 
                        receiver: item.receiver.email, 
                        body: item.body,
                        created_at: item.receiver.created_at
                    }
                }

                setMessages({...filteredMessages});
                // ref.current.scrollTo({top: ref.current.offsetTop + ref.current.offsetHeight});
                ref.current.scrollIntoView({ behavior: "smooth" });
            })
    }

    const chatMessages = Object.keys(messages).map(msg => {
        return <ChannelMessage 
            title={messages[msg].sender} 
            message={messages[msg].body} 
            created_at={messages[msg].created_at} />
    })

    // Sending
    const sendMessage = ({message, receiverId, headers}) => {

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
                receiver_id: receiverId, 
                receiver_class: "User", 
                body: message 
            })
        }

        const url = `${process.env.REACT_APP_SLACK_ENDPOINT}/messages`;
        
        fetch(url, options) 
            .then(response => {
                return response.json();
            })
            .then(data => {
                if(!data.errors) {
                    const dm = data.data;
                    const filteredMessage = {};
    
                    filteredMessage[dm.id] = {
                        sender: headers.user.uid,
                        receiver: '', 
                        body: dm.body, 
                        created_at: dm.created_at 
                    }
    
                    setMessages({...messages, ...filteredMessage});
                    
                    // Scroll to bottom
                    // ref.current.scrollTo({top: ref.current.offsetTop + ref.current.offsetHeight});
                    ref.current.scrollIntoView({ behavior: "smooth" });
                } else {
                    console.log("There is an error sending message.");
                }
            })
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
            sendMessage({message, receiverId, headers});

            e.target.value = '';
            setChatInput('');
        }
    }

    
    return (
        <section id="channel-chat">
            <div id="channel-header">
                <div className="container header">
                    <h1><img src="https://a.slack-edge.com/d4111/img/apps/workflows_192.png" alt="" /> {receiverName}</h1>
                </div>
            </div>

            <div id="channel-chat-content">
                {chatMessages}
                <div ref={ref}></div>
            </div>

            <div id="channel-chat-input">
                <div className="container">
                    <textarea name="" id="" onChange={typingChat} onKeyPress={handleEnter} placeholder="Message #announcement">{chatInput}</textarea>
                </div>
            </div>
        </section>
    )
}

const ChannelMessage = (props) => {
    const {title, message, created_at} = props;

    return (
        <div className="channel-message">
            <div className="sender-pic"><img src="https://a.slack-edge.com/d4111/img/apps/workflows_192.png" alt="" /></div>
            <div className="sender">
                <div className="sender-name">{title} <span className="created">{created_at}</span></div>
                <div className="sender-message">{message}</div>
            </div>
        </div>
    )
}

export default DirectMessage;
