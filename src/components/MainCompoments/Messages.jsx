import React, { useEffect, useRef, useState } from 'react';
import Message from "./Message";
import ResultModal from "../RecordResultModal/ResultModal";
import "./style.css";
import { useCookieManager } from '../../customHook/useCookieManager';

const Messages = ({ userName, messages, userId, userProfile, myProfile }) => {
  const lastMessageRef = useRef(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [emotion, setEmotion] = useState(''); // 감정 상태 저장
  const [clickedMessage, setClickedMessage] = useState(''); // 클릭된 메시지 저장
  const [aiSuggestion, setAiSuggestion] = useState(''); // AI의 답변 예시 저장
  const { getCookies } = useCookieManager();
  // 감정 번호 매핑
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
    const clickedMsg = msg.message; // 클릭한 메시지의 내용
    setClickedMessage(clickedMsg);
  
    let aiResponse = null;
  
    // AI 추천 응답이 없을 경우에만 서버로 요청
    if (!msg.aiSuggestion) {
      // API 요청을 클릭 시에만 발생
      aiResponse = await getAiSuggestion(msg); // 비동기 API 요청 (클릭 시에만 발생)
    } else {
      aiResponse = msg.aiSuggestion; // 이미 존재하는 AI 응답을 사용
    }
  
    // 감정 분석 로직
    const detectedEmotion = analyzeEmotion(clickedMsg);
  
    // 상태 업데이트
    setEmotion(emotionMapping[detectedEmotion]); // 감정 상태 설정
    setAiSuggestion(aiResponse); // AI 응답 설정
    setShowResultModal(true); // 모달 표시
  };

  // 감정 분석 로직 (임시로 간단한 분석 함수)
  const analyzeEmotion = (message) => {
    if (message.includes('슬퍼')) return '슬픔';
    if (message.includes('행복해')) return '행복함';
    if (message.includes('싫어')) return '싫어함';
    if (message.includes('화나')) return '화남';
    if (message.includes('두려워')) return '두려움';
    // 더 많은 감정 분석 조건 추가 가능
    return '평범함';
  };
  const getAiSuggestion = async (msg) => {
    const localAccessToken = getCookies().accessToken;
    try {
      console.log(msg.id);  // ID가 올바르게 출력되는지 확인
  
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/OpenAI/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localAccessToken}`,
        },
        body: JSON.stringify({ id: msg.id })  // 객체로 감싸서 전달
      });
  
      if (!response.ok) {
        throw new Error('AI 서버 응답 오류');
      }
  
      const data = await response.json();  // API 응답 데이터
      console.log(data);
  
      if (!data || !data.resultData) {
        throw new Error(data.resultMsg);
      }
  
      return data.resultData;  // 서버에서 받은 데이터를 반환
    } catch (error) {
      console.error('Error fetching AI suggestion:', error.message);
      return ['적절한 답변을 고민해보세요.'];  // 오류 발생 시 기본 메시지 반환
    }
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
          onClick={() => handleMessageClick(msg)} // 각 메시지에 클릭 핸들러 추가
        />
      ))}
      <ResultModal 
        show={showResultModal} 
        onClose={() => setShowResultModal(false)} 
        emotion={emotion} // 숫자 형태로 감정 전달
        userMessage={clickedMessage} // 클릭된 메시지 전달
        aiSuggestion={aiSuggestion} 
      />
    </div>
  );
};

export default Messages;
