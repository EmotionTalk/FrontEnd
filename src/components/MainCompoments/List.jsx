import React, { useState } from 'react';
import Search from './Search';
import Profile from "../../assets/pro.jpg";
import Modal from '../F_AddModal/F_Add';
import "./style.css";
import FA from "../../assets/친구추가.svg";

const List = ({ friendsList, onUserChatClick, onContextMenu }) => { // 기본값을 빈 배열로 설정
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='list' style={{ position: 'relative' }}>
      <div className='navbar'>
        <span className='f-list'>친구 목록</span>
        <img src={FA} className='f-a' onClick={openModal} alt="친구추가" />
      </div>
      <Search />
      <div className='chats'>
        {friendsList.length > 0 ? (
          friendsList.map((friend) => (
            <div
              key={friend.friendMemberId}
              className="users-wrapper"
              onContextMenu={(event) => onContextMenu(event, friend)}  // 우클릭 시 이벤트 호출
            >
              <div
                className="users"
                onClick={() => onUserChatClick(friend.nickname, friend.friendMemberId, friend.friendProfileImageUrl)}
              >
                <img className="userProfileImg" src={friend.friendProfileImageUrl || Profile} alt="Profile" />
                <div className="userChatInfo">
                  <span>{friend.nickname}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-friends">친구가 없습니다.</div>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default List;