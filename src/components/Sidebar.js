import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";

const Sidebar = (props) => {
    // setChatWindow choices: 'chat', 'create-chat', 'dm'
    const {setChatWindow, setPage} = props;
    // contains array of channels that i joined
    const [chanList, setChanList] = useState([]);
    // contains array of users who dm with me
    const [dmList, setdmList] = useState([]);

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
                    console.log(data)
                } else {
                    // no errors
                    console.log(data)
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

        fetch(`${process.env.REACT_APP_SLACK_ENDPOINT}/messages?receiver_id=${user.id}&receiver_class=User`, options)
            .then(response => {
                return response.json()
            })
            .then(data => {
                const dms = data.data;
                console.log(dms);
            })
    }

    useEffect(() => {
        const accessToken = localStorage.getItem('access-token');
        const client = localStorage.getItem('client');
        const expiry = localStorage.getItem('expiry');
        const uid = localStorage.getItem('uid');
        const user = JSON.parse(localStorage.getItem('user'));

        // get users channels only if all headers exists
        if(accessToken && client && expiry && uid) {
            getUserChannels({accessToken, client, expiry, uid});
            getUserMessages(user, {accessToken, client, expiry, uid});
        } else {
            // else go to login page
            setPage('login'); 
        }
    }, [chanList, dmList]);

    return (
        <section id="sidebar">
            <div id="side-header">
                <div className="container header">
                    <h1>Avion School</h1>
                    <a href="#"><i className='bx bx-message-square-edit' id="side-create-message"></i></a>
                </div>
            </div>

            <div className="container">
                <div id="side-channel-list">
                    <a href="#">Channels</a>
                    <ul>
                        <li><i className='bx bx-hash'></i> announcement</li>
                        <li><i className='bx bx-hash'></i> coding</li>
                        <li><i className='bx bx-hash'></i> mentoring</li>
                        <li><a href="#"><i className='bx bxs-plus-square' ></i> Create channels</a></li>
                    </ul>
                </div>

                <div id="side-direct-messages" className="mt-2">
                    <a href="#">Direct messages</a>
                    <ul>
                        <li className="dm-item"><img src="https://a.slack-edge.com/d4111/img/apps/workflows_192.png" alt="" /> Slackbot</li>
                        <li className="dm-item"><img src="https://ca.slack-edge.com/T010DU0GZE0-U02C42FABUK-8daed97695af-512" alt="" /> Jeffrey de Lara</li>
                        <li className="dm-item"><img src="https://ca.slack-edge.com/T010DU0GZE0-U01CNLJ3J0P-46af7649e68b-512" alt="" /> Maurus Vitor</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Sidebar;
