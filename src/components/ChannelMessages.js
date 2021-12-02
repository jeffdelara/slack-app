import React from "react";
import ChannelMessage from "./ChannelMessage";

const ChannelMessages = (props) => {
    const {channelMessages} = props;

    let outChannelMessages = false;
    if(channelMessages) {
        outChannelMessages = channelMessages.map( message => {
            return (
                <ChannelMessage 
                        userName="Jeff de Lara" 
                        userMessage="Hi!" 
                        chatDate="8:01 PM" 
                        userPicture="https://ca.slack-edge.com/T010DU0GZE0-U02C42FABUK-8daed97695af-512" />
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
