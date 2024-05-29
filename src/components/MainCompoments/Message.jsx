import React, { forwardRef } from 'react';
import "./style.css";
import Pro from "../../assets/pro.jpg";

const Message = forwardRef(({ text, time, image }, ref) => (
  <div className='message owner' ref={ref}>
    <div className="messageInfo">
      <img src={Pro} alt="profile" /> {/* 프로필 이미지 표시 */}
      <span>종설</span>
    </div>
    <div className="messageContent">
      {image ? <img src={image} alt="sent" /> : <p>{text}</p>} {/* 이미지가 있는 경우 이미지를 표시하고, 없는 경우 텍스트를 표시 */}
      <span className="messageTime">{time}</span>
    </div>
  </div>
));

export default Message;
