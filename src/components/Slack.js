import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ChannelChat from "./ChannelChat";
import Thread from "./Thread";
import ChannelCreate from "./ChannelCreate";
import DirectMessage from "./DirectMessage";

const Slack = (props) => {
    const {setPage} = props;
    const [isThreadOpen, setIsThreadOpen] = useState(true);
    const [chatWindow, setChatWindow] = useState('chat'); // chat, create-chat, dm

    let chat = <ChannelChat setIsThreadOpen={setIsThreadOpen} />

    if(chatWindow === 'chat') {
        chat = <ChannelChat setIsThreadOpen={setIsThreadOpen} />
    }

    if(chatWindow === 'create-chat') {
        chat = <ChannelCreate />
    }

    if(chatWindow === 'dm') {
        // send the user id maybe?
        chat = <DirectMessage />
    }

    const thread = isThreadOpen && <Thread setIsThreadOpen={setIsThreadOpen} />
    
    return (
        <main>
            <Sidebar setChatWindow={setChatWindow} setPage={setPage} />
            {chat}
            {thread}
        </main>
    )
}

export default Slack;
