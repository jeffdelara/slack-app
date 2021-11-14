import React, {useEffect, useState} from "react";

const ChannelItems = (props) => {
    const {chanList, setChatWindow} = props;
    
    const changeChannel = (e) => {
        e.preventDefault();
        const channelId = +e.target.getAttribute("data-id");
        setChatWindow('chat');
    }

    const chans = chanList.map(chan => {
        return <li><a href="#" onClick={changeChannel} data-id={chan.id}><i className='bx bx-hash'></i> {chan.name}</a></li>
    });

    return (
        <>
            {chans}
        </>
    )
}

export default ChannelItems;
