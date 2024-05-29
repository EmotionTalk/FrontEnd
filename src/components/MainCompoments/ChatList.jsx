import React from 'react';
import Search from './Search';
import Profile from "../../assets/pro.jpg";
import "./style.css";
import CA from '../../assets/채팅추가.svg'

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
        <img src={CA} className='c-a' />
      </div>
      <Search />
      <div className='chats'>
        {/* 사용자 채팅 요소 */}
        <div className="userChat" onClick={handleChatClick}>
          <img src={Profile} className='ipro'/>
          <div className="userChatInfo">
          {/* 채팅 상대 */}
            <span>dud</span> 
            {/* 마지막으로 보낸 */}
            <p>hi</p>
          </div>
        </div>
          </div>
    </div>
  );
};

export default ChatList;
