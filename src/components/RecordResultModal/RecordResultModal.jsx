import React from 'react';
import './RecordResultModal.css';
import X from "../../assets/fx.svg";

// 감정에 해당하는 아이콘들
import Angry from "../../assets/angry.svg";
import Sad from "../../assets/sad.svg";
import Dislike from "../../assets/dislike.svg";
import Ordinary from "../../assets/ordinary.svg";
import Happy from "../../assets/happy.svg";
import Awe from "../../assets/awe.svg";
import sendIcon from "../../assets/send.svg";

const RecordResultModal = ({ show, onClose, emotion, resultText, suggestedResponse, onSend }) => {
  // 감정 매핑
  const emotionMapping = {
    0: { icon: Angry, text: '상대방은 화가 났어요', className: 'angry' },
    1: { icon: Awe, text: '상대방은 두려워하고 있어요', className: 'awe' },
    2: { icon: Sad, text: '상대방은 슬퍼하고 있어요', className: 'sad' },
    3: { icon: Dislike, text: '상대방은 싫어하고 있어요', className: 'dislike' },
    4: { icon: Ordinary, text: '상대방은 아무런 감정을 안 느끼고 있어요', className: 'ordinary' },
    5: { icon: Happy, text: '상대방은 행복해하고 있어요', className: 'happy' }
  };

  const currentEmotion = emotionMapping[emotion] || {};

  return (
    <div className={show ? 'record-result-modal-overlay' : 'hidden'} onClick={onClose}>
      <div className="record-result-modal" onClick={(e) => e.stopPropagation()}>
        {/* 모달 닫기 버튼 */}
        <img src={X} className='rx' onClick={onClose} alt="close" />

        {/* 감정 아이콘과 텍스트 */}
        <div className="emotion-section">
          <img src={currentEmotion.icon} className="emotion-icon" alt={currentEmotion.text} />
          <p className={`emotion-text ${currentEmotion.className}`}>
            <strong>{currentEmotion.text}</strong>
          </p>
        </div>

        {/* 음성 텍스트 변환 섹션 */}
        <div className="result-section transcription">
          <p>{resultText}</p>
        </div>

        {/* 대답 추천 섹션 */}
        <div className="result-section suggested-response">
          <p>{suggestedResponse}</p>
        </div>

        {/* 전송 버튼 */}
        <div className="send-button-container">
          <button className="send-button" onClick={onSend}>
            <img src={sendIcon} alt="send" className="send-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordResultModal;
