
import React from 'react';
import './ResultModal.css';
import X from "../../assets/fx.svg";

// 감정에 해당하는 아이콘들
import Angry from "../../assets/angry.svg";
import Sad from "../../assets/sad.svg";
import Dislike from "../../assets/dislike.svg";
import Ordinary from "../../assets/ordinary.svg";
import Happy from "../../assets/happy.svg";
import Awe from "../../assets/awe.svg";

const ResultModal = ({ show, onClose, emotion, userMessage, aiSuggestion }) => {
  const emotionMapping = {
    0: { icon: Angry, text: '화남' },
    1: { icon: Awe, text: '두려움' },
    2: { icon: Sad, text: '슬픔' },
    3: { icon: Dislike, text: '싫어함' },
    4: { icon: Ordinary, text: '평범함' },
    5: { icon: Happy, text: '행복함' }
  };

  const currentEmotion = emotionMapping[emotion] || {};

  const copyToClipboard = () => {
    navigator.clipboard.writeText(aiSuggestion)
      .then(() => {
        alert("답변이 클립보드에 복사되었습니다.");
      })
      .catch(err => {
        console.error("복사 실패:", err);
      });
  };

  return (
    <div className={show ? 'modal-overlay1' : 'hidden'} onClick={onClose}>
      <div className="modal1" onClick={(e) => e.stopPropagation()}>
        <img src={X} className='rx' onClick={onClose} />
        
        <div className="modal-header1">
          <img src={currentEmotion.icon} className="emo" alt={currentEmotion.text} />
        </div>
        
        <div className="modal-body1">
          <p>현재 감정 상태는 <strong>{currentEmotion.text}</strong> 입니다.</p>
          
          <div className="user-message">
            <p><strong>상대방 메시지:</strong></p>
            <p>{userMessage}</p>
          </div>

          <div className="ai-suggestion">
            <p className="suggestion-title">답변 예시입니다:</p>
            <p className="suggestion-content">{aiSuggestion || "AI 제안이 없습니다."}</p>
          </div>
        </div>

        <div className="modal-footer1">
          <button className="copy-btn" onClick={copyToClipboard}>답변 복사하기</button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;




