import React, { useEffect, useState } from "react";
import ChannelItems from "./ChannelItems";
import SideDirectMessages from "./SideDirectMessages";
import { getHeaders } from "./Utils";

const Sidebar = (props) => {
    // setChatWindow choices: 'chat', 'create-chat', 'dm'
    // setPage choices: 'login', 'slack'
    const {setChatWindow, setPage, chanList, setChanList, dmList, setdmList, setChannelId, setChannelName} = props;

    const [isLogout, setIsLogout] = useState(false);
    const [memberIDs, setMemberIDs] = useState([]);
    const [stateMemberMessage, setStateMemberMessage] = useState([]);
    const headers = getHeaders();

    const getUserChannels = ({accessToken, client, expiry, uid}) => {
        const options = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'access-token' : accessToken, 
                'client' : client,
                'expiry' : expiry, 
                'uid' : uid
            }
        }

        fetch(`${process.env.REACT_APP_SLACK_ENDPOINT}/channels`, options)
            .then(response => {
                return response.json()
            })
            .then(data => {
                if(data.errors) {
                    // console.log(data)
                } else {
                    // no errors
                    const channels = data.data;
                    setChanList([...channels]);
                }
            })
    }

    const getUserMessages = (user, headers) => {
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

        const url = `${process.env.REACT_APP_SLACK_ENDPOINT}/messages?receiver_id=${user.id}&receiver_class=User`;
        fetch(url, options)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const dms = data.data;

                // setdmList([...dms]);
            })
    }

    // populate the sidebar
    useEffect(() => {
        const { accessToken, client, expiry, uid, user } = getHeaders();

        // get users channels only if all headers exists
        if(accessToken && client && expiry && uid) {
            // get user channels only when channel list is not yet loaded
            getUserChannels({accessToken, client, expiry, uid});
            // getUserMessages(user, {accessToken, client, expiry, uid});
        } else {
            // else go to login page
            setPage('login'); 
        }
    }, []);

    // For logout
    useEffect(() => {
        if(isLogout) {
            // delete localstorage
            localStorage.clear();
            // go to login page
            setPage('login');
        }
    }, [isLogout])

    useEffect(() => {
        getMemberList(chanList);
    }, [chanList]);

    useEffect(() => {
        const uniqueMemberIDs = [...new Set(memberIDs) ];
        getMembersMessage(uniqueMemberIDs);
    }, [memberIDs]);

    const getMembersMessage = async (userIds) => {

        const membersMessages = [];

        userIds.forEach( async userId => {
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
    
            const url = `${process.env.REACT_APP_SLACK_ENDPOINT}/messages?receiver_id=${userId}&receiver_class=User`;

            const response = await fetch(url, options);
            const data = await response.json();

            const messages = data.data;

            const sender = messages[0].sender.uid;
            const recvr = messages[0].receiver.uid;
            let userName = '';
            if(sender === recvr) { 
                userName = headers.user.uid; 
            } else if (sender === headers.user.uid) {
                userName = recvr;
            } else {
                userName = sender;
            }

            const user = {
                id: userId, 
                name: userName,
                messages: messages
            }
            
            
            membersMessages.push(user);
            setStateMemberMessage([...membersMessages, user]);
        });
    }

    useEffect(() => {

        let filteredArray = [];

        function isExists(member) {
            for(const f of filteredArray) {
                if(f.id === member.id) {
                    return true;
                }
            }

            return false;
        }
        
        stateMemberMessage.forEach( member => {
            if(!isExists(member)) {
                filteredArray.push(member);
            }
        });
        
        setdmList(filteredArray);
    }, [stateMemberMessage]);

    const getMemberList = async (list) => {
        let channelMembers = [];

        list.forEach( async channel => {

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

            const url = `${process.env.REACT_APP_SLACK_ENDPOINT}/channels/${channel.id}`;

            const response = await fetch(url, options);
            const data = await response.json();

            const channelDetails = data.data; 

            channelDetails.channel_members.forEach(channelMember => {

                if(!channelMembers.includes(channelMember.user_id)) {
                    const userId = channelMember.user_id;
                    // const value = getMemberMessage(userId);
                    channelMembers.push(userId);
                    setMemberIDs([...channelMembers, userId]);
                }
            })
            
        });

    }

    // handler for creating a channel
    const createChannel = (e) => {
        e.preventDefault();
        // opens the create-chat panel
        setChatWindow('create-chat');
    }


    const createMessage = (e) => {
        e.preventDefault();
        console.log("CREATE MESSAGE", e.target);
        setChatWindow('compose-message');
    }

    return (
        <section id="sidebar">
            <div id="side-header">
                <div className="container header">
                    <h1>Avion School</h1>
                    <a href="#" onClick={createMessage}>
                        <i className='bx bx-message-square-edit' id="side-create-message"></i>
                    </a>
                </div>
            </div>

            <div className="container">
                <div id="side-channel-list">
                    <a href="#">Channels</a>
                    <ul>
                        <ChannelItems 
                            chanList={chanList} 
                            setChatWindow={setChatWindow} 
                            setChannelId={setChannelId}
                            setChannelName={setChannelName} />

                        <li><a href="#" onClick={createChannel}><i className='bx bxs-plus-square' ></i> Create channels</a></li>
                    </ul>
                </div>

                <div id="side-direct-messages" className="mt-2">
                    <a href="#">Direct messages</a>
                    <SideDirectMessages 
                        dmList={dmList} 
                        setdmList={setdmList} 
                        setChatWindow={setChatWindow}
                        setChannelId={setChannelId} 
                        setChannelName={setChannelName} />
                </div>

                <div className="mt-2"><a href="#" onClick={() => setIsLogout(true)}><i class='bx bx-log-out'></i> Logout</a></div>
            </div>
        </section>
    )
}

export default Sidebar;
