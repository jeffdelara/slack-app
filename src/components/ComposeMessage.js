import React, { useEffect, useState } from "react";
import { getHeaders } from "./Utils";

const ComposeMessage = (props) => {
    const {setChannelId, setChannelName} = props;
    // array of users from api
    const [users, setUsers] = useState([]);
    // the result of searched user
    const [user, setUser] = useState('');
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
                    <input type="text" onChange={typingUser} value={searchTerm} name="channelName" className="textbox" placeholder="Enter user id" autoComplete="off" />
                    <br />
                    <div className="muted mt">{ matchedTerms.length } users found.</div>
                    <UserSearchResults matchedTerms={matchedTerms} />
                </div>
            </div>
        </section>
    )
}



const UserSearchResults = (props) => {
    const {matchedTerms} = props; 
    const searchResults = matchedTerms;

    const results = searchResults.map(user => {
        return <SearchItem name={user.email} id={user.id} />
    });

    return (
        <>
        {results}
        </>
    )
}

const SearchItem = (props) => {
    const { id, name } = props;
    return (
        <div className="channel-message" key={id}>
            <div className="sender-pic"><img src="https://a.slack-edge.com/d4111/img/apps/workflows_192.png" alt="" /></div>
            <div className="sender">
                <div className="sender-name"><a href="#">{name}</a></div>
                <div className="muted">ID: {name}</div>
            </div>
        </div>
    )
}

export default ComposeMessage;
