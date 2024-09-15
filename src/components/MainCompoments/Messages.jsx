import React, { useEffect, useRef, useState } from 'react';
import Message from "./Message";
import ResultModal from "../RecordResultModal/ResultModal";
import "./style.css";

const Messages = ({ userName, messages, userId, userProfile, myProfile }) => {
  const lastMessageRef = useRef(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [emotion, setEmotion] = useState(''); // 감정 상태 저장
  const [clickedMessage, setClickedMessage] = useState(''); // 클릭된 메시지 저장
  const [aiSuggestion, setAiSuggestion] = useState(''); // AI의 답변 예시 저장

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

  const handleMessageClick = (msg) => {
    const clickedMsg = msg.message; // 클릭한 메시지의 내용
    setClickedMessage(clickedMsg);

    // 감정 분석 및 AI 답변 예시 설정
    const detectedEmotion = analyzeEmotion(clickedMsg); // 감정 분석 로직
    const aiResponse = getAiSuggestion(detectedEmotion); // AI 답변 예시

    setEmotion(emotionMapping[detectedEmotion]); // 숫자로 된 감정 값 설정
    setAiSuggestion(aiResponse);
    setShowResultModal(true);
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

  // AI 답변 예시 제공 (임시)
  const getAiSuggestion = (emotion) => {
    const suggestions = {
      슬픔: '왜 슬프니',
      행복함: '왜 행복하니',
      싫어함: '왜 싫니',
      두려움: '왜 두렵니',
      화남: '왜 화나니',
      평범함: '현재 특별한 감정 상태는 아니지만 상대방의 이야기를 경청하세요.',
    };
    return suggestions[emotion] || '적절한 답변을 고민해보세요.';
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

