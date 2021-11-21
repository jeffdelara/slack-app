import React from "react";

const SideDirectMessages = (props) => {
    const {dmList, setdmList, setChatWindow, setChannelId, setChannelName} = props; 
    const dmObjects = {}
    
    // cleanup
    dmList.forEach( dm => {
        dmObjects[dm.sender.uid] = dm;
    });
    
    // get unique keys as name
    const sideDMList = Object.keys(dmObjects).map( dm => {
        const element = dmObjects[dm];
        return <SideDMPerson 
                receiverId={element.receiver.id} 
                pic="https://a.slack-edge.com/d4111/img/apps/workflows_192.png" 
                name={element.sender.uid}
                setChatWindow={setChatWindow}
                setChannelId={setChannelId} 
                setChannelName={setChannelName} />
    })

    return (
        <ul>
            {sideDMList}
        </ul>
    );
}

const SideDMPerson = (props) => {
    const {pic, name, receiverId, setChatWindow, setChannelId, setChannelName} = props;

    const changeChatWindow = (e) => {
        e.preventDefault();
        setChannelId(receiverId);
        setChannelName(name);
        setChatWindow('dm');
    }

    return (
        <li className="dm-item">
            <a href="#" data-receiver-id={receiverId} onClick={changeChatWindow}><img src={pic} alt="" /> {name}</a>
        </li>
    )
}

export default SideDirectMessages
