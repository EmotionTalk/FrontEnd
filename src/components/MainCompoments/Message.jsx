import React, { forwardRef } from 'react';
import "./style.css";
import DefaultProfile from "../../assets/pro.jpg";

const Message = forwardRef(({ message, sendTime, image, sender, profileImage, userName, onClick, onImageClick, messageType }, ref) => {
  const handleMessageClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={`message ${sender === 'me' ? 'owner' : ''} ${messageType === 'TRANSCRIPT' ? 'transcript-message' : ''}`} ref={ref}>
      <div className="messageInfo">
        <img src={profileImage || DefaultProfile} alt="profile" />
        <span>{userName}</span>
      </div>
      <div className="messageContent">
        {image ? (
          <img
            src={image}
            alt="sent"
            className="messageImage"
            onClick={onImageClick} // 이미지 클릭 핸들러 추가
          />
        ) : (
          <p onClick={handleMessageClick}>{message}</p>
        )}
        <span className="messageTime">{sendTime}</span>
      </div>
    </div>
  );
});

export default Message;
