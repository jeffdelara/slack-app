import React, {useState, useEffect} from "react";
import { getHeaders } from "./Utils";

const ChannelChatInput = (props) => {
    const {receiverId, setChatWindow, setChannelId, setChannelName} = props;
    const [chatInput, setChatInput] = useState('');
    const [messages, setMessages] = useState({});
    const headers = getHeaders();

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
                    console.log("CHAN CHAT INPUT: ", dm);
                    setChannelId(receiverId);
                    setChannelName(headers.user.uid);
                    setChatWindow('dm');
                    // 
                } else {
                    console.log("There is an error sending message.");
                }
            })
    }

    return (
        <div id="channel-chat-input">
            <div className="container">
                <textarea name="" id="" onChange={typingChat} onKeyPress={handleEnter} 
                placeholder="Message #announcement">{chatInput}</textarea>
            </div>
        </div>
    )
}

export default ChannelChatInput;
