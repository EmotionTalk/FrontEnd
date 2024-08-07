import React, { forwardRef } from 'react';
import "./style.css";
import Pro from "../../assets/pro.jpg";

const Message = forwardRef(({ message, sendTime, image, onClick }, ref) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className='message owner' ref={ref} onClick={handleClick}>
      <div className="messageInfo">
        <img src={Pro} alt="profile" /> {/* 프로필 이미지 표시 */}
        <span>종설</span>
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
