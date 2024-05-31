import React, { useState } from 'react';
import Search from './Search'; // 검색 컴포넌트 가져오기
import Profile from "../../assets/pro.jpg"; // 프로필 이미지 가져오기
import Modal from '../F_AddModal/F_Add'; // 친구 추가 모달 가져오기
import "./style.css"; // 스타일 시트 가져오기
import FA from "../../assets/친구추가.svg"; // 친구 추가 아이콘 이미지 가져오기

// 미리 정의된 사용자 목록
const users = [
  { id: 'user1', name: 'dud', status: '둗남이' },
  { id: 'user2', name: '팀장', status: '연락 안 봐요' },
  { id: 'user3', name: '소프트웨어융기', status: '종합설계 소프트웨어융기 팀' },
];

// 친구 목록 컴포넌트
const List = ({ onUserChatClick }) => {
  // 상태 변수 및 상태 설정 함수들
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기 함수
  const openModal = () => {
    console.log("Opening modal");
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
  };

  // UI 반환
  return (
    <div className='list'>
      <div className='navbar'>
        <span className='f-list'>친구 목록</span> {/* 친구 목록 제목 */}
        <img src={FA} className='f-a' onClick={openModal} alt="친구추가" /> {/* 친구 추가 아이콘 */}
      </div>
      <Search /> {/* 검색 컴포넌트 */}
      <div className='chats'>
        {users.map(user => (
          <div className="users" key={user.id} onClick={() => onUserChatClick(user)}>
            <img src={Profile} alt="Profile"/> {/* 프로필 이미지 */}
            <div className="userChatInfo">
              <span>{user.name}</span> {/* 사용자 이름 */}
              <p>{user.status}</p> {/* 사용자 상태 메시지 */}
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} /> {/* 친구 추가 모달 */}
    </div>
  );
};

export default List;
