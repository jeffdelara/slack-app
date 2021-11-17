import React, {useEffect, useState} from "react";

const ChannelItems = (props) => {
    const {chanList, setChatWindow, setChannelId, setChannelName} = props;
    
    const changeChannel = (e) => {
        e.preventDefault();
        const channelId = +e.target.getAttribute("data-id");
        const channelName = e.target.getAttribute("data-channel-name");
        setChatWindow('chat');
        setChannelId(channelId);
        setChannelName(channelName);
    }

    const chans = chanList.map(chan => {
        return <li><a href="#" onClick={changeChannel} data-channel-name={chan.name} data-id={chan.id}><i className='bx bx-hash'></i> {chan.name}</a></li>
    });

    return (
        <>
            {chans}
        </>
    )
}

export default ChannelItems;
