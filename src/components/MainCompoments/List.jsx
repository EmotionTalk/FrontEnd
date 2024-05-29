import React from 'react';
import Search from './Search';
import Profile from "../../assets/pro.jpg";
import "./style.css";

const List = ({ onUserChatClick }) => {

  const handleUserChatClick = () => {
    onUserChatClick(); // 클릭 시 onUserChatClick 함수 호출
  };

  return (
    <div className='list'>
      <div className='navbar'>
        <span className='f-list'>친구 목록</span>
      </div>
      <Search />
      <div className='chats'>
        <div className="users" onClick={handleUserChatClick}>
          <img src={Profile} alt="Profile"/>
          <div className="userChatInfo">
            <span>dud</span>
            <p>hi</p>
          </div>
        </div>
        <div className="users" onClick={handleUserChatClick}>
          <img src={Profile} alt="Profile"/>
          <div className="userChatInfo">
            <span>dud</span>
            <p>hi</p>
          </div>
        </div>
        <div className="users" onClick={handleUserChatClick}>
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

export default List;
