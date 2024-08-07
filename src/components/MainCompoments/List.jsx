import React, { useState, useEffect, useRef } from 'react';
import Search from './Search';
import Profile from "../../assets/pro.jpg";
import Modal from '../F_AddModal/F_Add';
import "./style.css";
import FA from "../../assets/친구추가.svg";
import { useCookieManager } from '../../customHook/useCookieManager';

const List = ({ onUserChatClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [friends, setFriends] = useState([]);

  const { getCookies } = useCookieManager();
  
  const fetchFriends = async () => {
    const localAccessToken = getCookies().accessToken;
    if (localAccessToken) {
      try {
        const response = await fetch('http://localhost:8080/friend/getFriends', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localAccessToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data.resultData);
        setFriends(data.resultData);
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      }
    }
  };

  
  useEffect(() => {
    fetchFriends();
  }, []); // 빈 배열을 의존성 배열로 설정하여 최초 마운트 시에만 실행

  const handleUserChatClick = async (userName, friendId) => {
    onUserChatClick(userName, friendId); // 클릭 시 사용자 이름과 채팅방 ID를 전달
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFriendAdded = () => {
    fetchFriends(); // 친구 추가 후 목록을 업데이트
  };

  return (
    <div className='list'>
      <div className='navbar'>
        <span className='f-list'>친구 목록</span>
        <img src={FA} className='f-a' onClick={openModal} alt="친구추가" />
      </div>
      <Search />
      <div className='chats'>
        {friends.map(friend => (
          <div key={friend.friendMemberId} className="users" onClick={() => handleUserChatClick(friend.nickname, friend.friendMemberId)}>
            <img src={friend.friendProfileImageUrl || Profile} alt="Profile" />
            <div className="userChatInfo">
              <span>{friend.nickname}</span>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} onFriendAdded={handleFriendAdded} />
    </div>
  );
};

export default List;
      