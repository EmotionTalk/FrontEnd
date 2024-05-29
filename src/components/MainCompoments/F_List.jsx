import React, { useState } from 'react';
import Profile from "../../assets/pro.jpg";
import "./style.css";

const F_List = ({ onChatOpen }) => {
  const [clicked, setClicked] = useState(false);

  const handleUserChatClick = () => {
    if (!clicked) {
      setClicked(true);
      if (onChatOpen) {
        onChatOpen();
      }
    }
  };

  return (
    <div className='chats'>
      <div className="userChat">
        <img src={Profile} alt="Profile"/>
        <div className="userChatInfo">
          <span>dud</span>
          <p>hi</p>
        </div>
      </div>
      <div className="userChat">
        <img src={Profile} alt="Profile"/>
        <div className="userChatInfo">
          <span>dud</span>
          <p>hi</p>
        </div>
      </div>
      <div className="userChat">
        <img src={Profile} alt="Profile"/>
        <div className="userChatInfo">
          <span>dud</span>
          <p>hi</p>
        </div>
      </div>
    </div>
  );
};

export default F_List;
