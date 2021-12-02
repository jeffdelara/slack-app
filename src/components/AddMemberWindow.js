import React, {useState, useEffect} from "react";
import { getHeaders } from "./Utils";
import UserSearchResults from "./UserSearchResults";
import FormNotif from "./FormNotif";

const AddMemberWindow = (props) => {
    const {channelId, setChatWindow, channelName} = props;
    // array of users from api
    const [users, setUsers] = useState([]);
    // picked user
    const [user, setUser] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [matchedTerms, setMatchedTerms] = useState([]);
    const [error, setError] = useState(false);

    const headers = getHeaders();
    // get all users
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

    const confirmAdd = (e) => {
        e.preventDefault();
        console.log("ADD", user);
        // add user
        addMember(user.id);
    }

    const addMember = async (id) => {
        const url = `${process.env.REACT_APP_SLACK_ENDPOINT}/channel/add_member`;
        const payload = { id: channelId, member_id: id };
        const options = {
            method: 'POST', 
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json', 
                'access-token' : headers.accessToken, 
                'client' : headers.client, 
                'expiry' : headers.expiry, 
                'uid' : headers.uid
            }, 
            body: JSON.stringify(payload)
        }
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        if(!data.errors) {
            // success
            setError({message: "User added to channel.", mtype: 'success'});
        } else {
            console.log(data.errors);
            const errorMessages = data.errors.join(" ");
            setError({message: errorMessages, mtype: 'danger'});
        }
    }

    useEffect(() => {
        if(!user) {
            setError(false);
        }
    }, [user]);

    return (
        <section id="channel-chat">
            <div id="channel-header">
                <div className="container header">
                    <h1><i className='bx bx-message-square-edit'></i> Add member</h1>
                </div>
            </div>

            <div id="channel-chat-content">
                <div className="container">
                <div className="muted">Select a user to add to channel <strong>@{channelName}</strong></div>
                <div>{error && <FormNotif messageType={error.mtype} message={error.message} />}</div>
                { user &&  <div className="user-to">{user.name} <a href="#" onClick={resetCompose}>x</a></div>}
                    { !user && <input type="text" onChange={typingUser} value={searchTerm} name="channelName" className="textbox" placeholder="Search user..." autoComplete="off" />}
                    { !user && <div className="mt">
                        <UserSearchResults matchedTerms={matchedTerms} setUser={setUser} />
                        
                    </div> }

                {user && <div><a href="#" className="btn" onClick={confirmAdd}>Confirm add</a></div>}
                </div>
            </div>
        </section>
    )
}

export default AddMemberWindow;
