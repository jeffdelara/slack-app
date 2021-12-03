import React from "react";
import ChannelMessage from "./ChannelMessage";

const ChannelMessages = (props) => {
    const {channelMessages} = props;

    let outChannelMessages = false;
    if(channelMessages) {
        outChannelMessages = channelMessages.map( message => {
            return (
                <ChannelMessage 
                        userName={message.sender.uid}
                        userMessage={message.body}
                        chatDate={message.created_at} 
                        userPicture="https://a.slack-edge.com/d4111/img/apps/workflows_192.png" />
            )
        })
    }

    return (
        <>
        {channelMessages && outChannelMessages}
        </>
    )
}

export default ChannelMessages;
