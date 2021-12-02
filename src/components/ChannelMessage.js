import React from 'react';

const ChannelMessage = (props) => {

  const { userName, userMessage, userPicture, chatDate } = props;

  return (
    <div className="channel-message">
      <div className="sender-pic"><img src={userPicture} alt="" /></div>
      <div className="sender">
          <div className="sender-name">{userName} <span className="created">{chatDate}</span></div>
          <div className="sender-message">{userMessage}</div>
      </div>
    </div>
  )
}

export default ChannelMessage;
