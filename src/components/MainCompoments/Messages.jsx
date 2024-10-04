import React, { useEffect, useRef, useState } from 'react';
import Message from "./Message";
import ResultModal from "../ResultModal/ResultModal";
import RecordResultModal from "../RecordResultModal/RecordResultModal";
import LoadingModal from "../LoadingModal/LoadingModal"; 
import ImageModal from "../ImageModal/ImageModal"; // 이미지 모달 추가
import "./style.css";
import { useCookieManager } from '../../customHook/useCookieManager';

const Messages = ({ userName, messages, userId, userProfile, myProfile }) => {
  const lastMessageRef = useRef(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false); // 이미지 모달 상태 추가
  const [currentImage, setCurrentImage] = useState(''); // 현재 선택된 이미지 상태
  const [emotion, setEmotion] = useState('');
  const [clickedMessage, setClickedMessage] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const { getCookies } = useCookieManager();

  const emotionMapping = {
    화남: 0,
    두려움: 1,
    슬픔: 2,
    싫어함: 3,
    평범함: 4,
    행복함: 5
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const handleMessageClick = async (msg) => {
    const clickedMsg = msg.message;
    setClickedMessage(clickedMsg);
    setShowLoadingModal(true);
  
    let aiResponse = null;
  
    // TRANSCRIPT 메시지 타입인지 확인
    if (msg.messageType === 'TRANSCRIPT') {
      setEmotion(analyzeEmotion(clickedMsg)); // 감정 분석
      aiResponse = '이 메시지는 음성 텍스트 변환입니다.'; // AI 응답 필요시 여기에서 정의
      setShowLoadingModal(false);
      setShowResultModal(false); // ResultModal은 닫음
      setShowRecordResultModal(true); // RecordResultModal을 열음
    } else {
      if (!msg.aiSuggestion) {
        aiResponse = await getAiSuggestion(msg);
      } else {
        aiResponse = msg.aiSuggestion;
      }
      
      const detectedEmotion = analyzeEmotion(clickedMsg);
      setEmotion(emotionMapping[detectedEmotion]);
      setAiSuggestion(aiResponse);
      setShowLoadingModal(false);
      setShowResultModal(true);
    }
};

// RecordResultModal을 보여주기 위한 상태 추가
const [showRecordResultModal, setShowRecordResultModal] = useState(false);

  const analyzeEmotion = (message) => {
    if (message.includes('슬퍼')) return '슬픔';
    if (message.includes('행복해')) return '행복함';
    if (message.includes('싫어')) return '싫어함';
    if (message.includes('화나')) return '화남';
    if (message.includes('두려워')) return '두려움';
    return '평범함';
  };

  const getAiSuggestion = async (msg) => {
    const localAccessToken = getCookies().accessToken;
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/OpenAI/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localAccessToken}`,
        },
        body: JSON.stringify({ id: msg.id })
      });
  
      if (!response.ok) {
        throw new Error('AI 서버 응답 오류');
      }
  
      const data = await response.json();
  
      if (!data || !data.resultData) {
        throw new Error(data.resultMsg);
      }
  
      return data.resultData;
    } catch (error) {
      console.error('Error fetching AI suggestion:', error.message);
      return ['적절한 답변을 고민해보세요.'];
    }
  };

  const handleImageClick = (image) => {
    setCurrentImage(image); // 현재 선택된 이미지 설정
    setShowImageModal(true); // 이미지 모달 표시
  };

  const closeImageModal = () => {
    setShowImageModal(false); // 이미지 모달 닫기
    setCurrentImage(''); // 현재 선택된 이미지 초기화
  };

  return (
    <div className='messages'>
      {messages.map((msg, index) => (
        <Message
          key={index}
          ref={index === messages.length - 1 ? lastMessageRef : null}
          message={msg.messageType === 'IMAGE' ? null : msg.message}
          sendTime={msg.sendTime}
          image={msg.messageType === 'IMAGE' ? msg.filePath : null}
          sender={msg.senderId === userId ? 'me' : 'other'}
          profileImage={msg.senderId === userId ? myProfile : userProfile}
          userName={msg.senderId === userId ? '나' : userName}
          onClick={() => handleMessageClick(msg)}
          onImageClick={() => handleImageClick(msg.filePath)} // 이미지 클릭 핸들러 추가
          messageType={msg.messageType} // 메시지 타입 전달
        />
        
      ))}

      <LoadingModal loading={showLoadingModal} />

      <ResultModal 
        show={showResultModal} 
        onClose={() => setShowResultModal(false)} 
        emotion={emotion}
        userMessage={clickedMessage} 
        aiSuggestion={aiSuggestion} 
      />

      {/* 이미지 모달 추가 */}
      {showImageModal && (
        <ImageModal image={currentImage} onClose={closeImageModal} />
      )}
      {/* RecordResultModal 추가 */}
      {showRecordResultModal && (
          <RecordResultModal 
              show={showRecordResultModal} 
              onClose={() => setShowRecordResultModal(false)} 
              emotion={emotion}
              resultText={clickedMessage} 
              suggestedResponse={aiSuggestion} 
          />
      )}

    </div>
  );
};

export default Messages;
