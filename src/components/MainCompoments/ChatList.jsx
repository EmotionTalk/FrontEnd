import React from 'react';
import Search from './Search';
import Profile from "../../assets/pro.jpg";
import "./style.css";
import CA from '../../assets/채팅추가.svg';

const ChatList = ({ onUserChatClick, chatList = [] }) => {
  console.log(chatList)
  const handleChatClick = (userName) => {
    if (onUserChatClick) {
      onUserChatClick(userName); // 클릭한 사용자의 이름을 부모 컴포넌트로 전달
    }
  };

  const truncateMessage = (message = '', length = 20) => {
    if (!message) {
      return ''; // message가 null, undefined, 혹은 빈 문자열일 때 빈 문자열 반환
    }
    return message.length > length ? `${message.slice(0, length)}...` : message;
  };
  

  return (
    <div className='chatlist'>
      <div className='navbar'>
        <span className='c-list'>채팅 목록</span>
        <img src={CA} className='c-a' alt="채팅 추가" />
      </div>
      <Search />
      <div className='chats'>
        {chatList.length > 0 ? (
          chatList.map((chat, index) => (
            <div 
              key={index} // 고유한 key를 각 항목에 추가
              className="userChat" 
              onClick={() => handleChatClick(chat.nickName)} // 동적으로 클릭된 사용자의 이름을 전달
            >
              <img 
                src={chat.friendProfileUrl ? chat.friendProfileUrl : Profile} 
                className='ipro' 
                alt="프로필 이미지" 
              />
              <div className="userChatInfo">
                <span>{chat.nickName}</span> 
                <p>{truncateMessage(chat.lastChat)}</p> {/* 트렁케이트 처리 */}
              </div>
            </div>
          ))
        ) : (
          <p>채팅 목록이 없습니다.</p> // 채팅 목록이 비었을 때의 처리
        )}
      </div>
    </div>
  );
};

export default ChatList;
