import React, { forwardRef } from 'react';
import "./style.css";
import DefaultProfile from "../../assets/pro.jpg";

const Message = forwardRef(({ message, sendTime, image, sender, profileImage, userName, onClick }, ref) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={`message ${sender === 'me' ? 'owner' : ''}`} ref={ref} onClick={handleClick}>
      <div className="messageInfo">
        <img src={profileImage || DefaultProfile} alt="profile" />
        <span>{userName}</span>
      </div>
      <div className="messageContent">
        {image ? (
          <img src={image} alt="sent" className="messageImage" />
        ) : (
          <p>{message}</p>
        )}
        <span className="messageTime">{sendTime}</span>
      </div>
    </div>
  );
});

export default Message;
