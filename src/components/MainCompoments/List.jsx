import React from 'react';
import Search from './Search';
import Profile from "../../assets/pro.jpg";
import "./style.css";
import FA from "../../assets/친구추가.svg"

const List = ({ onUserChatClick }) => {

  const handleUserChatClick = () => {
    onUserChatClick(); // 클릭 시 onUserChatClick 함수 호출
  };

  return (
    <div className='list'>
      <div className='navbar'>
        <span className='f-list'>친구 목록</span>
        <img src={FA} className='f-a' />
      </div>
      <Search />
      <div className='chats'>
        <div className="users" onClick={handleUserChatClick}>
          <img src={Profile} alt="Profile"/>
          <div className="userChatInfo">
            <span>dud</span>
            <p>둗남이</p>
          </div>
        </div>
        <div className="users" onClick={handleUserChatClick}>
          <img src={Profile} alt="Profile"/>
          <div className="userChatInfo">
            <span>팀장</span>
            <p>연락 안 봐요</p>
          </div>
        </div>
        <div className="users" onClick={handleUserChatClick}>
          <img src={Profile} alt="Profile"/>
          <div className="userChatInfo">
            <span>소프트웨어융기</span>
            <p>종합설게 소프트웨어융기 팀</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
