import React, { useEffect, useState } from "react";
import ChannelChatInput from "./ChannelChatInput";
import { getHeaders } from "./Utils";
import UserSearchResults from "./UserSearchResults";

const ComposeMessage = (props) => {
    const {setChannelId, setChannelName, setChatWindow} = props;
    // array of users from api
    const [users, setUsers] = useState([]);
    
    // picked user
    const [user, setUser] = useState(false);
    // the result of searched users
    const [searchTerm, setSearchTerm] = useState('');
    const [matchedTerms, setMatchedTerms] = useState([]);
    const headers = getHeaders();

    useEffect(() => {
        // Get all users
        getAllUsers();
    }, []);


    const getAllUsers = () => {
        const options = {
            headers: {
                'access-token' : headers.accessToken, 
                'client' : headers.client, 
                'expiry' : headers.expiry, 
                'uid' : headers.uid
            }
        }

        const url = `${process.env.REACT_APP_SLACK_ENDPOINT}/users`;

        fetch(url, options)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const fetchedUsers = data.data.map(user => {
                    return { id: user.id, uid: user.uid, email: user.email }
                })
                setUsers(fetchedUsers);
            })
    }
    
    let searchThrottle;

    const typingUser = (e) => {
        // typing / searching for user
        clearTimeout(searchThrottle);
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
    }

    useEffect(() => {

        if(searchTerm === '') {
            setMatchedTerms([]);
            return;
        }

        
        searchThrottle = setTimeout(() => {
            // search using regex for Symbol
            let matchedTerm = users.filter(userMatch => {
                const reg1 = "[a-zA-Z0-9]*";
                const regex = new RegExp(searchTerm + reg1);
                return userMatch.email.match(regex);
            });

            setMatchedTerms(matchedTerm);    
        }, 500);

        
    }, [searchTerm])

    const resetCompose = (e) => {
        e.preventDefault();
        setUser(false);
    }

    return (
        <section id="channel-chat">
            <div id="channel-header">
                <div className="container header">
                    <h1><i className='bx bx-message-square-edit'></i> Compose message</h1>

                </div>
            </div>

            <div id="channel-chat-content">
                <div className="container">
                    <div className="muted">Send message to:</div>
                    { user &&  <div className="user-to">{user.name} <a href="#" onClick={resetCompose}>x</a></div>}
                    { !user && <input type="text" onChange={typingUser} value={searchTerm} name="channelName" className="textbox" placeholder="Search user..." autoComplete="off" />}
                    { !user && <div className="mt">
                        <UserSearchResults matchedTerms={matchedTerms} setUser={setUser} />
                    </div> }
                </div>
            </div>

            {user && <ChannelChatInput receiverId={user.id} 
                receiverName={user.name} 
                setChatWindow={setChatWindow} 
                setChannelId={setChannelId} 
                setChannelName={setChannelName} />}
        </section>
    )
}


export default ComposeMessage;
