import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ChannelChat from "./ChannelChat";
import Thread from "./Thread";
import ChannelCreate from "./ChannelCreate";
import DirectMessage from "./DirectMessage";
import ComposeMessage from "./ComposeMessage";
import AddMemberWindow from "./AddMemberWindow";

const Slack = (props) => {
    const {setPage} = props;
    const [isThreadOpen, setIsThreadOpen] = useState(true);
    const [chatWindow, setChatWindow] = useState('chat'); // chat, create-chat, dm
    const [channelId, setChannelId] = useState(0);
    const [channelName, setChannelName] = useState('');
    

    // sidebar states
    // contains array of channels that i joined
    const [chanList, setChanList] = useState([]);
    // contains array of users who dm with me
    const [dmList, setdmList] = useState([]);

    const [counter, setCounter] = useState(0);

    let chat = <ChannelChat setIsThreadOpen={setIsThreadOpen} />

    if(chatWindow === 'chat') {
        chat = <ChannelChat 
            setIsThreadOpen={setIsThreadOpen} 
            setChatWindow={setChatWindow} 
            channelId={channelId} 
            counter={counter} 
            setCounter={setCounter}
            channelName={channelName} />
    }

    if(chatWindow === 'create-chat') {
        chat = <ChannelCreate chanList={chanList} setChanList={setChanList} />
    }

    if(chatWindow === 'dm') {
        // send the user id as channelId
        chat = <DirectMessage channelId={channelId} counter={counter} setCounter={setCounter} channelName={channelName} />
    }

    if(chatWindow === 'compose-message') {
        // set channel id & name once the user has composed the message
        chat = <ComposeMessage 
            setChannelId={setChannelId} 
            setChannelName={setChannelName} 
            setChatWindow={setChatWindow} />
    }

    if(chatWindow === 'add-member') {
        chat = <AddMemberWindow channelId={channelId} channelName={channelName} setChatWindow={setChatWindow} />
    }

    const thread = isThreadOpen && <Thread setIsThreadOpen={setIsThreadOpen} />
    
    return (
        <main>
            <Sidebar setChatWindow={setChatWindow} 
                setPage={setPage} 
                chanList={chanList} 
                setChanList={setChanList} 
                dmList={dmList}
                setdmList={setdmList} 
                setChannelId={setChannelId} 
                setChannelName={setChannelName} />
            {chat}
            {thread}
        </main>
    )
}

export default Slack;
