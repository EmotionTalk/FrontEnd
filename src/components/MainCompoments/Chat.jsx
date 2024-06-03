import React, { useState, useEffect, useRef } from 'react';
import "./style.css";
import Messages from "./Messages";
import Mic from "../../assets/mic.svg";
import Pic from "../../assets/pic.png";
import X from "../../assets/x.svg";
import RecordModal from '../RecordModal';
import {toast} from "react-toastify";

const Chat = ({ onClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [isRecordModalOpen,setIsRecordModalOpen]=useState(false); // 녹음 모달창

  // 서버로 오디오 파일을 전송하는 함수
  const sendAudioFile = async (audioFile) => {
    try {
      const formData = new FormData();
      formData.append('file', audioFile);

      const response = await fetch('http://localhost:8000/predict/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // const data = await response.json();
      toast.success('파일이 성공적으로 업로드되었습니다.');
    } catch (error) {
      toast.error('파일 업로드에 실패했습니다.');
      console.error('Error:', error);
    }
  };

  // 녹음 모달창
  const handleRecordBtn=()=>{
    setIsRecordModalOpen(true);
  }

  const closeRecordModal=()=>{
    setIsRecordModalOpen(false);
  }

  const handleCloseClick = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = {
        text: message,
        time: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      setMessage("");
      scrollToBottom(); // 메시지가 추가될 때마다 스크롤을 아래로 이동
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        const newMessage = {
          image: imageUrl, // 이미지 URL을 메시지에 추가
          time: new Date().toLocaleTimeString(),
        };
        setMessages([...messages, newMessage]);
        scrollToBottom(); // 메시지가 추가될 때마다 스크롤을 아래로 이동
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
  };

  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>권건표</span>
        <img src={X} className='ix' onClick={handleCloseClick} />
        <div className="chatIcons"></div>
      </div>
      <Messages messages={messages} />
      <div ref={messagesEndRef} />
      <div className='input'>
        <input
          type="text"
          placeholder='메세지를 입력하세요.'
          value={message}
          onChange={handleMessageChange}
          onKeyPress={handleKeyPress}
        />
        <div className="send">
          <img src={Mic} className='im' onClick={handleRecordBtn}/>
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={handleFileChange} // 파일 선택 시 실행될 함수 연결
          />
          {isRecordModalOpen && (
            <RecordModal
              closeRecordModal={closeRecordModal}
              sendAudioFile={sendAudioFile}
            />
          )}
          <label htmlFor='file'>
            <img src={Pic} className='ip' alt="" />
          </label>
          <button onClick={handleSendMessage} className='sb'>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
