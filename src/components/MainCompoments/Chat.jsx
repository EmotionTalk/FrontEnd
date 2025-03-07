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

const Chat = ({ onClose, userName, userProfile, myProfile, friendId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [userId, setUserId] = useState(null);
  const messagesEndRef = useRef(null);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const stompClient = useRef(null);
  const { getCookies } = useCookieManager();

  useEffect(() => {
    moment.locale('ko');
    console.log(friendId)
    const getChatRoom = async (friendId) => {
      console.log("채팅방 입성");
      const localAccessToken = getCookies().accessToken;
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/chatroom/getOrMakeChatRoom?friendId=${friendId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localAccessToken}`,
          }
        });
        const data = await response.json();
        setChatRoomId(data.resultData.chatRoomId);
        setUserId(data.resultData.userId);
        console.log('datas : ', data);

        const formattedMessages = data.resultData.messages.map(msg => {
          const sendTimeString = msg.sendTime;
          const sendTime = moment(sendTimeString).tz('Asia/Seoul').format('A hh시 mm분');
          return {
            id: msg.id,
            message: msg.message,
            sendTime: sendTime,
            senderId: msg.senderId,
            filePath: msg.filePath,
            messageType: msg.messageType,
            audioUrl: msg.messageType === 'VOICE' ? msg.filePath : null,
            aiSuggestion: msg.aiSuggestion,
            emotionNum: msg.emotionNum,
          };
        });
        setMessages(formattedMessages);
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      }
    };

    const connect = (chatRoomId) => {
      const localAccessToken = getCookies().accessToken;
      const socket = new WebSocket(`ws://${process.env.REACT_APP_LOCAL_IP}:8080/ws`);
      stompClient.current = Stomp.over(socket);
      stompClient.current.connect({ 'Authorization': `Bearer ${localAccessToken}` }, () => {
        console.log('Connected to WebSocket');
        stompClient.current.subscribe(`/sub/chatroom/${chatRoomId}`, (message) => {
          const newMessage = JSON.parse(message.body);
          const sendTimeString = newMessage.sendTime;
          newMessage.sendTime = moment(sendTimeString).tz('Asia/Seoul').format('A hh시 mm분');
          // 기존 메시지를 업데이트하는 로직 추가
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            const messageIndex = updatedMessages.findIndex(msg => msg.id === newMessage.id);
  
            // 메시지 ID가 같으면 기존 메시지를 업데이트
            if (messageIndex !== -1) {
              updatedMessages[messageIndex] = newMessage;
              // 수정된 메시지라면 스크롤하지 않음
            } else {
              // 메시지 ID가 없으면 새로 추가
              updatedMessages.push(newMessage);
              // 새로운 메시지일 경우 스크롤을 내림
              scrollToBottom();
            }
            return updatedMessages;
          });
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


  const handleTranscriptSend = async (transcript, audioUrl, emotionResult) => {
    const localAccessToken = getCookies().accessToken;
  
    // audioUrl이 올바른 Blob으로 변환되는지 확인
    const audioBlob = await fetch(audioUrl).then((r) => r.blob());
  
    // 파일 업로드 및 메시지 전송 처리
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.mp3');
  
    try {
      // 파일 업로드 요청
      const uploadResponse = await fetch(`${process.env.REACT_APP_SERVER_URL}/file/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localAccessToken}`,
        },
        body: formData,
      });
  
      if (!uploadResponse.ok) {
        throw new Error('File upload failed');
      }
  
      const result = await uploadResponse.json();
      const fileId = result.resultData;
      console.log(fileId)
  

      const newMessage = {
        message: transcript,
        sendTime: moment().tz('Asia/Seoul').format('yyyy-MM-DDTHH:mm:ss'),
        messageType: 'VOICE',
        emotionNum: emotionResult,
        fileId: fileId,
        chatRoomId: chatRoomId,
        senderId: userId,
        // audioUrl: audioUrl
      };
  
      // WebSocket을 통해 메시지 전송
      stompClient.current.publish({
        destination: `/pub/file-message/${chatRoomId}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localAccessToken}`,
        },
        body: JSON.stringify(newMessage),
      });
  
      scrollToBottom();
      toast.success('음성 메시지가 전송되었습니다.');
    } catch (error) {
      console.error('Error:', error);
      toast.error('음성 메시지 전송에 실패했습니다.');
    }


};


  // 메시지 전송 핸들러
  const handleSendMessage = () => {
    const localAccessToken = getCookies().accessToken;
    if (message.trim() !== "") {
      const newMessage = {
        message: message,
        sendTime: moment().tz('Asia/Seoul').format('yyyy-MM-DDTHH:mm:ss'),
        messageType: "TEXT",
        emotionNum : 4,
        chatRoomId: chatRoomId,
      };

      stompClient.current.publish({
        destination: `/pub/message/${chatRoomId}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localAccessToken}`
        },
        body: JSON.stringify(newMessage)
      });
      console.log(newMessage);
      setMessage("");
      scrollToBottom();
    }
  };

  const handleRecordBtn = () => {
    setIsRecordModalOpen(true);
  };

  const closeRecordModal = () => {
    setIsRecordModalOpen(false);
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

        const newMessage = {
          message: '이미지',
          sendTime: moment().tz('Asia/Seoul').format('yyyy-MM-DDTHH:mm:ss'),
          messageType: 'IMAGE',
          fileId: fileId,
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


  // 스크롤 함수 정의
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
  };

  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{userName}</span>
        <img src={X} className='ix' onClick={onClose} />
        <div className="chatIcons"></div>      </div>
      {/* 채팅 메시지 목록 컴포넌트 */}
      <Messages userName={userName} messages={messages} userId={userId} userProfile={userProfile} myProfile={myProfile} />
      <div ref={messagesEndRef} />

      {/* 메시지 입력 및 전송 UI */}
      <div className='input'>
        <input
          type="text"
          placeholder='메세지를 입력하세요.'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div className="send">
          <img src={Mic} className='im' onClick={handleRecordBtn} />
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={handleFileChange}
          />          {isRecordModalOpen && (
            <RecordModal
              closeRecordModal={closeRecordModal}
              onTranscriptSend={handleTranscriptSend} // transcript 전송 핸들러 전달
            />
          )}
          
          <input type="file" style={{ display: "none" }} id="file" />
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