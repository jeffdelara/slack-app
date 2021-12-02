import React from 'react';

const ChannelMessage = (props) => {

  const { userName, userMessage, userPicture, chatDate } = props;

  return (
    <div className="channel-message">
      <div className="sender-pic"><img src="https://ca.slack-edge.com/T010DU0GZE0-U02C42FABUK-8daed97695af-512" alt="" /></div>
      <div className="sender">
          <div className="sender-name">{userName} <span className="created">{chatDate}</span></div>
          <div className="sender-message">{userMessage}</div>
      </div>
    </div>
  )
}

export default ChannelMessage;
