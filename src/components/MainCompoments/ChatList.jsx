import React from 'react';
import Search from './Search';
import Profile from "../../assets/pro.jpg";
import "./style.css";

const ChatList = ({ onUserChatClick }) => {
  const handleChatClick = () => {
    if (onUserChatClick) {
      onUserChatClick(); // onUserChatClick 함수를 호출하여 클릭 이벤트를 전달합니다.
    }
  };
    
  return (
    <div className='chatlist'>
      <div className='navbar'>
        <span className='c-list'>채팅 목록</span>
      </div>
      <Search />
      <div className='chats'>
        {/* 사용자 채팅 요소 */}
        <div className="userChat" onClick={handleChatClick}>
          <img src={Profile} alt="Profile"/>
          <div className="userChatInfo">
            <span>dud</span>
            <p>hi</p>
          </div>
        </div>
          </div>
    </div>
  );
};

export default ChatList;
