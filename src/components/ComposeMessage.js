import React, { useEffect, useState } from "react";
import { getHeaders } from "./Utils";

const ComposeMessage = (props) => {
    const {setChannelId, setChannelName} = props;
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
                    { !user && <input type="text" onChange={typingUser} value={searchTerm} name="channelName" className="textbox" placeholder="Enter user id" autoComplete="off" />}
                    { !user && <div className="mt">
                        <UserSearchResults matchedTerms={matchedTerms} setUser={setUser} />
                    </div> }
                </div>
            </div>

            <div id="channel-chat-input">
                <div className="container">
                    <textarea name="" id="" onChange={() => {}} onKeyPress={() => {}} placeholder="Message"></textarea>
                </div>
            </div>
        </section>
    )
}



const UserSearchResults = (props) => {
    const {matchedTerms, setUser} = props; 
    const searchResults = matchedTerms;

    const results = searchResults.map(user => {
        return <SearchItem name={user.email} setUser={setUser} id={user.id} />
    });

    return (
        <>
        {results}
        </>
    )
}

const SearchItem = (props) => {
    const { id, name, setUser } = props;

    const confirmReceiver = (e, id) => {
        e.preventDefault();
        console.log(id);
        setUser({id, name});
        // send receiver id
        // put -> sample@gmail.com [x] replacing the search field
        // show textarea for composing message
    }

    return (
        <div className="channel-message" key={id}>
            <div className="sender-pic"><img src="https://a.slack-edge.com/d4111/img/apps/workflows_192.png" alt="" /></div>
            <div className="sender">
                <div className="sender-name"><a href="#" onClick={(e) => confirmReceiver(e, id)}>{name}</a></div>
                <div className="muted">ID: {name}</div>
            </div>
        </div>
    )
}

export default ComposeMessage;
