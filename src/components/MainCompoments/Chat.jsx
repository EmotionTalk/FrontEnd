import React, { useState, useEffect, useRef } from 'react';
import "./style.css";
import Messages from "./Messages";
import Mic from "../../assets/mic.svg";
import Pic from "../../assets/pic.png";
import X from "../../assets/x.svg";
import RecordModal from '../RecordModal';
import { useCookieManager } from '../../customHook/useCookieManager';
import { toast } from "react-toastify";
import { Stomp } from "@stomp/stompjs";
import moment from 'moment-timezone';
import 'moment/locale/ko'; // 한국어 로케일 추가

const Chat = ({ onClose, userName, friendId, setLastMessages }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatRoomId, setChatRoomId] = useState(null);
  const messagesEndRef = useRef(null);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const stompClient = useRef(null);
  const { getCookies } = useCookieManager();

  useEffect(() => {
    moment.locale('ko'); // 한국어 로케일 설정

    const getChatRoom = async (friendId) => {
      const localAccessToken = getCookies().accessToken;
      try {
        const response = await fetch(`http://localhost:8080/chatroom/getOrMakeChatRoom?friendId=${friendId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localAccessToken}`,
          }
        });
        const data = await response.json();
        setChatRoomId(data.resultData.chatRoomId);  
        console.log('datas : ', data);

        const formattedMessages = data.resultData.messages.map(msg => {
          const sendTimeString = msg.sendTime;
          const sendTime = moment(sendTimeString).tz('Asia/Seoul').format('A hh시 mm분'); // A는 오전/오후
          
          return {
            message: msg.message,
            sendTime: sendTime,
            senderId: msg.senderId,
            filePath: msg.filePath,
            messageType: msg.messageType
          };
        });
        setMessages(formattedMessages);
      } catch (error) { 
        console.error('There was a problem with your fetch operation:', error);
      }
    };

    const connect = (chatRoomId) => {
      const localAccessToken = getCookies().accessToken;
      const socket = new WebSocket(`ws://localhost:8080/ws`);
      stompClient.current = Stomp.over(socket);
      stompClient.current.connect({ 'Authorization' : `Bearer ${localAccessToken}` }, () => {
        console.log('Connected to WebSocket');
        stompClient.current.subscribe(`/sub/chatroom/${chatRoomId}`, (message) => {
          const newMessage = JSON.parse(message.body);
          const sendTimeString = newMessage.sendTime;
          console.log(newMessage);
          newMessage.sendTime = moment(sendTimeString).tz('Asia/Seoul').format('A hh시 mm분'); // A는 오전/오후
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
      });
    };

    if (friendId) {
      getChatRoom(friendId).then(() => {
        if (chatRoomId) {
          connect(chatRoomId);
        }
      });
    }

    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect(() => {
          console.log('Disconnected from WebSocket');
        });
      }
    };
  }, [friendId, chatRoomId]);

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

      toast.success('음성이 정상적으로 분석 중입니다...');
    } catch (error) {
      toast.error('음성 분석 중 오류 발생');
      console.error('Error:', error);
    }
  };

  const handleRecordBtn = () => {
    setIsRecordModalOpen(true);
  };

  const closeRecordModal = () => {
    setIsRecordModalOpen(false);
  };

  const handleCloseClick = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    const localAccessToken = getCookies().accessToken;  
    if (message.trim() !== "") {
      const newMessage = {
        message: message,
        sendTime: moment().tz('Asia/Seoul').format('yyyy-MM-DDTHH:mm:ss'), // LocalDateTime 형식으로 변경
        messageType: "TEXT",
        chatRoomId: chatRoomId // 추가된 chatRoomId
      };

      stompClient.current.publish({ 
        destination: `/pub/message/${chatRoomId}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localAccessToken}` 
        },
        body: JSON.stringify(newMessage)
      });

      // 입력창 초기화
      setMessage("");

      // 화면을 맨 아래로 스크롤
      scrollToBottom();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  const handleFileChange = async (e) => {
    const localAccessToken = getCookies().accessToken;
    const file = e.target.files[0];
    if (file) {
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      if (!validImageTypes.includes(file.type)) {
        toast.error('아직 사진만 전송이 가능합니다');
        return;
      }
      
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        // 파일 업로드
        const uploadResponse = await fetch('http://localhost:8080/file/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localAccessToken}`
          },
          body: formData,
        });
  
        if (!uploadResponse.ok) {
          throw new Error('File upload failed');
        }
  
        const result = await uploadResponse.json();
        console.log(result);
        const fileId = result.resultData;
        console.log(fileId);
  
        // STOMP 메시지 전송
        const newMessage = {
          message: '이미지',
          sendTime: moment().tz('Asia/Seoul').format('yyyy-MM-DDTHH:mm:ss'),
          messageType: 'IMAGE',
          fileId: fileId, // 파일 ID
          chatRoomId: chatRoomId
        };
  
        stompClient.current.publish({
          destination: `/pub/file-message/${chatRoomId}`,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localAccessToken}`
          },
          body: JSON.stringify(newMessage)
        });
  
        console.log('File message sent:', newMessage);
        scrollToBottom();
      } catch (error) {
        console.error('Error:', error);
      }
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
        <span>{userName}</span>
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
          <img src={Mic} className='im' onClick={handleRecordBtn} />
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={handleFileChange}
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
