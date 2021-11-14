import React, { useState, useEffect } from "react";

const ChannelCreate = (props) => {
    const {chanList, setChanList} = props;
    const [userId, setUserId] = useState(null);
    const [headers, setHeaders] = useState({});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUserId(user.id);

        setHeaders({
            'Content-Type' : 'application/json', 
            'access-token' : localStorage.getItem('access-token'),
            'client' : localStorage.getItem('client'),
            'expiry' : localStorage.getItem('expiry'), 
            'uid' : localStorage.getItem('uid')
        })
    }, [userId]);

    const onSubmit = (e) => {
        e.preventDefault();
        const channelName = e.target.elements.channelName.value;

        // check if not empty field
        if(channelName.trim()) {
            console.log(channelName);
            createChannel(channelName, userId);
        }
    }

    const createChannel = (channelName, userId) => {
        console.log(channelName, userId);

        const payload = {
            name: channelName, 
            user_ids: [+userId]
        }

        const options = {
            method: 'POST', 
            mode: 'cors', 
            headers: headers,
            body: JSON.stringify(payload)
        }

        const url = `${process.env.REACT_APP_SLACK_ENDPOINT}/channels`;

        fetch(url, options)
            .then(response => {
                return response.json()
            })
            .then(data => {

                if(data.errors) {
                    console.log(data);
                } else {
                    setChanList([...chanList, data.data]);
                }
            })
    }

    return (
        <section id="channel-chat">
            <div id="channel-header">
                <div className="container header">
                    <h1><i className='bx bx-hash'></i> Create channel</h1>

                </div>
            </div>

            <div id="channel-chat-content">
                <div className="container">
                    <div className="muted">Type the name of new channel</div>
                    <form className="form form-full" onSubmit={onSubmit}>
                        <input type="text" name="channelName" className="textbox" placeholder="Channel name" />
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ChannelCreate;
