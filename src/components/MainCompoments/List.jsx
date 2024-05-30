import React, { useState } from 'react';
import Search from './Search';
import Profile from "../../assets/pro.jpg";
import Modal from '../F_AddModal/F_Add'; // 경로를 정확히 설정하세요.
import "./style.css";
import FA from "../../assets/친구추가.svg";

const List = ({ onUserChatClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserChatClick = () => {
    onUserChatClick(); // 클릭 시 onUserChatClick 함수 호출
  };

  const openModal = () => {
    console.log("Opening modal");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
  };

  return (
    <div className='list'>
      <div className='navbar'>
        <span className='f-list'>친구 목록</span>
        <img src={FA} className='f-a' onClick={openModal} alt="친구추가" />
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
            <p>종합설계 소프트웨어융기 팀</p>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default List;
