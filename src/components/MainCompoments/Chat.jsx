import React, { useState, useEffect, useRef } from 'react';
import "./style.css"; // 스타일 시트 가져오기
import Messages from "./Messages"; // 메시지 컴포넌트 가져오기
import Mic from "../../assets/mic.svg"; // 마이크 아이콘 이미지 가져오기
import Pic from "../../assets/pic.png"; // 이미지 아이콘 이미지 가져오기
import X from "../../assets/x.svg"; // X 아이콘 이미지 가져오기
import RecordModal from '../RecordModal'; // 녹음 모달 컴포넌트 가져오기

const Chat = ({ user, onClose }) => {
  // 상태 변수 및 상태 설정 함수들
  const [message, setMessage] = useState(""); // 메시지 입력 상태 변수
  const [messages, setMessages] = useState([]); // 메시지 목록 상태 변수
  const messagesEndRef = useRef(null); // 메시지 스크롤 관련 ref
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false); // 녹음 모달 열림 여부 상태 변수

  // 유저 변경 시 로컬 스토리지에서 메시지 불러오기
  useEffect(() => {
    if (user) {
      const storedMessages = JSON.parse(localStorage.getItem(user.id)) || [];
      setMessages(storedMessages);
    }
  }, [user]);

  // 메시지가 변경될 때마다 맨 아래로 스크롤
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 녹음 버튼 클릭 시 모달 열기
  const handleRecordBtn = () => {
    setIsRecordModalOpen(true);
  };

  // 녹음 모달 닫기
  const closeRecordModal = () => {
    setIsRecordModalOpen(false);
  };

  // 채팅창 닫기 버튼 클릭 핸들러
  const handleCloseClick = () => {
    if (onClose) {
      onClose();
    }
  };

  // 메시지 입력 핸들러
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // 메시지 전송 핸들러
  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = {
        text: message,
        time: new Date().toLocaleTimeString(),
      };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      localStorage.setItem(user.id, JSON.stringify(updatedMessages));
      setMessage("");
      scrollToBottom();
    }
  };

  // 엔터 키를 눌렀을 때 메시지 전송
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // 파일 선택 시 이미지 전송 핸들러
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        const newMessage = {
          image: imageUrl,
          time: new Date().toLocaleTimeString(),
        };
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        localStorage.setItem(user.id, JSON.stringify(updatedMessages));
        scrollToBottom();
      };
      reader.readAsDataURL(file);
    }
  };

  // 메시지 스크롤 맨 아래로 이동
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
  };

  // UI 반환
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>Chat with {user.name}</span> {/* 사용자 이름 표시 */}
        <img src={X} className='ix' onClick={handleCloseClick} alt="Close" /> {/* 닫기 버튼 */}
        <div className="chatIcons"></div>
      </div>
      <Messages messages={messages} /> {/* 메시지 목록 컴포넌트 */}
      <div ref={messagesEndRef} /> {/* 메시지 스크롤 ref */}
      <div className='input'>
        <input
          type="text"
          placeholder='메세지를 입력하세요.'
          value={message}
          onChange={handleMessageChange}
          onKeyPress={handleKeyPress}
        /> {/* 메시지 입력란 */}
        <div className="send">
          <img src={Mic} className='im' onClick={handleRecordBtn} alt="Mic" /> {/* 녹음 버튼 */}
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={handleFileChange}
          />
          {isRecordModalOpen && <RecordModal closeRecordModal={closeRecordModal}/>} {/* 녹음 모달 */}
          <label htmlFor='file'>
            <img src={Pic} className='ip' alt="Pic" /> {/* 이미지 선택 버튼 */}
          </label>
          <button onClick={handleSendMessage} className='sb'>Send</button> {/* 전송 버튼 */}
        </div>
      </div>
    </div>
  );
};

export default Chat;
