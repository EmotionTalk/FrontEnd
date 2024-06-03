import React, { useState, useEffect } from 'react';
import Search from './Search';
import Profile from "../../assets/pro.jpg";
import Modal from '../F_AddModal/F_Add'; // 경로를 정확히 설정하세요.
import "./style.css";
import FA from "../../assets/친구추가.svg";
import { useCookieManager } from '../../customHook/useCookieManager';

const List = ({ onUserChatClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getCookies } = useCookieManager();

  useEffect(() => {
    const localAccessToken = getCookies().accessToken;
    if (localAccessToken) {
      fetch('http://localhost:8080/friend/getFriends', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localAccessToken}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // JSON 형식으로 응답 데이터를 파싱
      })
      .then(data => {
        // 응답 데이터(data)를 처리
        console.log(data);
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
    }
  }, [getCookies]);

  const handleUserChatClick = () => {
    onUserChatClick(); // 클릭 시 onUserChatClick 함수 호출
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
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
          <img src={Profile} alt="Profile" />
          <div className="userChatInfo">
            <span>dud</span>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default List;
