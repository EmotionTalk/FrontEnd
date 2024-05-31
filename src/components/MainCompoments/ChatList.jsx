import React, { useState, useEffect } from 'react';
import Search from './Search'; // 검색 컴포넌트 가져오기
import Profile from "../../assets/pro.jpg"; // 프로필 이미지 가져오기
import "./style.css"; // 스타일 시트 가져오기
import CA from '../../assets/채팅추가.svg'; // 채팅 추가 이미지 가져오기

// 미리 정의된 사용자 목록
const users = [
  { id: 'user1', name: 'dud' },
  { id: 'user2', name: '팀장' },
  { id: 'user3', name: '소프트웨어융기' },
];

// 채팅 목록 컴포넌트
const ChatList = ({ onUserChatClick }) => {
  // 상태 변수 및 상태 설정 함수들
  const [userChats, setUserChats] = useState([]);

  // 컴포넌트가 마운트될 때 채팅 목록을 불러옴
  useEffect(() => {
    const loadChats = () => {
      const chats = users.map(user => {
        const chatData = JSON.parse(localStorage.getItem(user.id)) || [];
        const lastMessage = chatData[chatData.length - 1] || { text: "", time: "" };
        return { ...user, lastMessage: truncateMessage(lastMessage.text, 20), lastMessageTime: lastMessage.time }; // 메시지 자르기
      });
      setUserChats(chats);
    };

    loadChats();
  }, []);

  // 채팅 목록에서 사용자를 클릭했을 때의 핸들러
  const handleChatClick = (user) => {
    if (onUserChatClick) {
      onUserChatClick(user);
    }
  };

  // 메시지를 일정 길이로 자르는 함수
  const truncateMessage = (message, maxLength) => {
    if (!message) {
      return ''; // 메시지가 없는 경우 빈 문자열 반환
    }
    if (message.startsWith('data:image')) {
      return '사진을 보냈습니다';
    }
    if (message.length > maxLength) {
      return message.slice(0, maxLength) + '...';
    }
    return message;
  };

  // UI 반환
  return (
    <div className='chatlist'>
      <div className='navbar'>
        <span className='c-list'>채팅 목록</span> {/* 채팅 목록 제목 */}
        <img src={CA} className='c-a' alt="채팅추가" /> {/* 채팅 추가 아이콘 */}
      </div>
      <Search /> {/* 검색 컴포넌트 */}
      <div className='chats'>
        {userChats.map(user => (
          <div className="userChat" key={user.id} onClick={() => handleChatClick(user)}>
            <img src={Profile} className='ipro' alt="Profile"/> {/* 프로필 이미지 */}
            <div className="userChatInfo">
              <span>{user.name}</span> {/* 사용자 이름 */}
              <p>{user.lastMessage}</p> {/* 마지막 메시지 */}
              <small>{user.lastMessageTime}</small> {/* 마지막 메시지 시간 */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
