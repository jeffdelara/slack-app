import React, {useState, useEffect} from "react";

const DirectMessage = (props) => {
    // channelId is also the receiver_id to be used for fetching API
    const {channelId, channelName} = props;
    const receiverId = channelId;
    const receiverName = channelName;

    const [messages, setMessages] = useState({});

    console.log(receiverName);

    const headers = {
         accessToken : localStorage.getItem('access-token'),
         client : localStorage.getItem('client'),
         expiry : localStorage.getItem('expiry'),
         uid : localStorage.getItem('uid'),
         user : JSON.parse(localStorage.getItem('user'))
    }

    useEffect(() => {
        console.log(receiverId);
        getUserMessages(receiverId, headers);

    }, [receiverId]);

    const getUserMessages = (receiverId, headers) => {
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

        const url = `${process.env.REACT_APP_SLACK_ENDPOINT}/messages?receiver_id=${receiverId}&receiver_class=User`;
        fetch(url, options)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data.data);
                const dm = data.data; 

                // const filteredMessages = dm.map(item => {
                //     const tempDm = {}
                //     tempDm[item.id] = {
                //         sender: item.sender.email, 
                //         receiver: item.receiver.email, 
                //         body: item.body,
                //         created_at: item.receiver.created_at
                //     }
                //     return tempDm;
                // });

                const filteredMessages = {};
                for(const item of dm) {
                    filteredMessages[item.id] = {
                        sender: item.sender.email, 
                        receiver: item.receiver.email, 
                        body: item.body,
                        created_at: item.receiver.created_at
                    }
                }

                console.log(filteredMessages);

                setMessages({...filteredMessages});
            })
    }

    const chatMessages = Object.keys(messages).map(msg => {
        return <ChannelMessage title={messages[msg].sender} 
            message={messages[msg].body} 
            created_at={messages[msg].created_at} />
    })
    
    return (
        <section id="channel-chat">
            <div id="channel-header">
                <div className="container header">
                    <h1><img src="https://a.slack-edge.com/d4111/img/apps/workflows_192.png" alt="" /> {channelName}</h1>
                </div>
            </div>

            <div id="channel-chat-content">
                {chatMessages}
                {/* <ChannelMessage title={title} message={message} /> */}
            </div>

            <div id="channel-chat-input">
                <div className="container">
                    <textarea name="" id="" placeholder="Message #announcement"></textarea>
                </div>
            </div>
        </section>
    )
}

const ChannelMessage = (props) => {
    const {title, message, created_at} = props;

    return (
        <div className="channel-message">
            <div className="sender-pic"><img src="https://a.slack-edge.com/d4111/img/apps/workflows_192.png" alt="" /></div>
            <div className="sender">
                <div className="sender-name">{title} <span className="created">{created_at}</span></div>
                <div className="sender-message">{message}</div>
            </div>
        </div>
    )
}

export default DirectMessage;
